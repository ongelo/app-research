import util from "util";

const log = (obj: any) => {
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true })
  );
};

export default log;
