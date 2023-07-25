import MaterialIcon from "../../common/MaterialIcon";

export default function DashboardPage() {
  return (
    <>
      <div className="px-[13vw]">
        <div
          className="flex items-center my-3 bg-foreground bg-opacity-10 rounded-lg border border-front border-opacity-20 focus-within:bg-background focus-within:bg-opacity-100
        duration-300 before:top-0 before:left-0 before:h-full before:w-full before:absolute before:-z-1 before:bg-primary relative before:rounded-inherit before:bg-opacity-0
        focus-within:before:scale-x-[100.49%] focus-within:before:scale-y-[110%] focus-within:before:bg-opacity-80 before:duration-inherit"
        >
          <MaterialIcon
            codepoint="e8b6"
            className="p-3 selection:hidden pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 h-full bg-transparent outline-none text-front text-opacity-80"
          />
        </div>
      </div>
    </>
  );
}
