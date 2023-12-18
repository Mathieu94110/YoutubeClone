import './SlideIn.css';
const SlideIn = ({
  children,
  startAnimation,
}: {
  children: React.JSX.Element;
  startAnimation: boolean;
}) => {
  const transtionProperties = startAnimation ? { left: 0, opacity: 1 } : {};
  return (
    <div className="slide-in" style={transtionProperties}>
      {children}
    </div>
  );
};
export default SlideIn;
