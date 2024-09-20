import "./loader.css";

export const Loader = (props: { display: "block" | "hidden" }) => {
  const { display } = props;

  return (
    <div
      className={`${display} flex-col bg-black opacity-90 shadow-[0_0_0_1000px_black] rounded fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="loader"></div>
    </div>
  );
};
