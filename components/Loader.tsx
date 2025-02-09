import { Bars } from "react-loader-spinner";
interface Props {
  height: string;
  width: string;
  color: string;
}

const Loader = ({ height = "80", width = "80", color }: Props) => {
  return (
    <div>
      <Bars
        height={height}
        width={width}
        color={color}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
