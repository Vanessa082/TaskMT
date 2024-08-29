function TextLogo({ className, ...restProps }) {
  return (
    <h1
      {...restProps}
      className={"w-fit flex items-center justify-center flex-nowrap gap-2 text-xl font-bold text-background-color cursor-pointer " + (className || "")}
    >
      <img
        src="/logo.svg"
        alt="app logo"
        width={30}
        height={30}
      />

      <span>TaskMT</span>
    </h1>
  );
};

export { TextLogo };
