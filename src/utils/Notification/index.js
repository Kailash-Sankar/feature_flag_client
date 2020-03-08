
import { notification } from "antd";

function feature(status, name, extra = "") {
    let msg = "Changes have been Saved!";
    let desc = `Created feature flag ${name}`;
  
    if (!status) {
      msg = `Encountered ${name}`;
      desc = `Server: ${extra}`;
    }
  
    notification.open({
      message: msg,
      description: desc
    });
}

export default { feature };