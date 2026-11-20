import { prepareHtmlEmbed } from "@/lib/html-embed";

export async function BlocksHtml({ source }: { source: string }) {
  const { scope, css, html } = await prepareHtmlEmbed(source);
  return (
    <div className={`${scope} wrap-anywhere [&_*]:max-w-full`}>
      {css && <style>{css}</style>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
