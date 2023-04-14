import { Avatar } from "@mantine/core";
import React from "react";
import Identicon from "identicon.js";
import "./style.scss";
import { useMemo } from "react";

const IdenticonAvatar = (props) => {
  const { id, ...rest} = props;

  const identiconImage = useMemo(() => {
    if (id === undefined || id === null) return null;
    try {
      const data = new Identicon(id.toString(), 128).toString();
      return `data:image/png;base64,${data}`;
    } catch (error) {
      return null;
    }
  }, [id]);

  return <Avatar src={identiconImage} {...rest} />;
};

export default IdenticonAvatar;
