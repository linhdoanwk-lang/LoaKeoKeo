import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request:Request){
  const body=await request.json() as {customerName?:string;customerEmail?:string;items?:Array<{id:number;quantity:number}>};
  const customerName=String(body.customerName??"").trim();
  const customerEmail=String(body.customerEmail??"").trim();
  const items=(body.items??[]).map(item=>({id:Number(item.id),quantity:Math.max(1,Number(item.quantity)||1)})).filter(item=>Number.isFinite(item.id));
  if(!customerName||items.length===0)return NextResponse.json({error:"missing_fields"},{status:400});
  try{
    const rows=await query<{orderId:number;total:number}>(`WITH input AS (SELECT id,quantity FROM jsonb_to_recordset($3::jsonb) AS x(id bigint,quantity int) WHERE quantity > 0), priced AS (SELECT p.id,p.name,p.price,input.quantity FROM input JOIN products p ON p.id=input.id WHERE p.published=TRUE), new_order AS (INSERT INTO orders (customer_name,customer_email,total,status) SELECT $1,$2,COALESCE(SUM(price*quantity),0),'pending' FROM priced RETURNING id,total), inserted_items AS (INSERT INTO order_items (order_id,product_id,product_name,quantity,unit_price) SELECT new_order.id,priced.id,priced.name,priced.quantity,priced.price FROM new_order CROSS JOIN priced RETURNING order_id) SELECT new_order.id AS "orderId",new_order.total FROM new_order`,[customerName,customerEmail||null,JSON.stringify(items)]);
    return NextResponse.json(rows[0],{status:201});
  }catch(error){return NextResponse.json({error:"order_failed",detail:String(error)},{status:500})}
}
