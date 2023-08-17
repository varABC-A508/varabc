const Content = ({ content }) => {
  return (
    <div
      className="text-[16px] whitespace-pre-wrap scrollbar mt-2 mb-8 pl-2 pr-2 text-white bg-primaryDark"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    >
    </div>
  );
};

export default Content;
