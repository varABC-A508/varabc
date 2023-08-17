export default function ReviewTag({ index, content, clicked, handleTagClick }) {
  return (
    <div
      key={index}
      className={`inline-flex justify-center items-center m-3 w-[254px] h-[64px] rounded-[30px] cursor-pointer ${clicked ? "bg-point": "bg-white" }`}
      onClick={handleTagClick}
    >
      <span className="text-[#2E2E2E] text-2xl font-bold"># {content}</span>
    </div>
  );
}