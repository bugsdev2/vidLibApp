export const Modal = (props: {
  display: "block" | "hidden";
  children: any;
}) => {
  const { display } = props;

  return (
    <div
      className={`${display}  fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border z-50 rounded-lg h-fit text-light bg-dark flex p-4 flex-col`}
    >
      <div className="text-center">{props.children}</div>
    </div>
  );
};
