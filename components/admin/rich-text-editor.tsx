"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered, Redo2, Undo2 } from "lucide-react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const buttons = [
  { label: "P", title: "Đoạn văn", command: "formatBlock", value: "p" },
  { label: "H2", title: "Tiêu đề H2", command: "formatBlock", value: "h2" },
  { label: "H3", title: "Tiêu đề H3", command: "formatBlock", value: "h3" },
] as const;

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && document.activeElement !== editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  function run(command: string, commandValue?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML ?? "");
  }

  const iconButtons = [
    { title: "In đậm", command: "bold", Icon: Bold },
    { title: "In nghiêng", command: "italic", Icon: Italic },
    { title: "Danh sách dấu chấm", command: "insertUnorderedList", Icon: List },
    { title: "Danh sách số", command: "insertOrderedList", Icon: ListOrdered },
    { title: "Hoàn tác", command: "undo", Icon: Undo2 },
    { title: "Làm lại", command: "redo", Icon: Redo2 },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-black/15 bg-white focus-within:border-black/40">
      <div className="flex flex-wrap items-center gap-1 border-b border-black/10 bg-black/[.025] p-2">
        {buttons.map((button) => (
          <button
            key={button.label}
            type="button"
            title={button.title}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => run(button.command, button.value)}
            className="min-w-9 rounded-md px-2 py-1.5 text-xs font-semibold text-black/65 hover:bg-white hover:text-black"
          >
            {button.label}
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-black/10" />
        {iconButtons.map(({ title, command, Icon }) => (
          <button
            key={command}
            type="button"
            title={title}
            aria-label={title}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => run(command)}
            className="grid h-8 w-8 place-items-center rounded-md text-black/55 hover:bg-white hover:text-black"
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Mô tả chi tiết, tính năng và hướng dẫn sử dụng..."
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-64 px-4 py-3 text-sm leading-7 outline-none empty:before:pointer-events-none empty:before:text-black/35 empty:before:content-[attr(data-placeholder)] [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
      />
      <p className="border-t border-black/10 px-3 py-2 text-xs text-black/40">
        Dùng H2/H3 để chia nội dung thành các phần rõ ràng. Định dạng được giữ nguyên ở trang sản phẩm.
      </p>
    </div>
  );
}
