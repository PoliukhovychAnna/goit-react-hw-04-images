import { Blocks } from "react-loader-spinner"

export const Loader = () => (
  <Blocks
    visible={true}
    height="180"
    width="180"
    ariaLabel="blocks-loading"
    wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '200px' }}
    wrapperClass="blocks-wrapper"
  />
);