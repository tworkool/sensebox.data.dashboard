import { Avatar } from "@mantine/core";
import React from "react";
import Identicon from "identicon.js";
import "./style.scss";
import { useMemo } from "react";

const IdenticonAvatar = (props) => {
  const { id } = props;

  const identiconImage = useMemo(() => {
    try {
      const data = new Identicon(id, 420).toString();
      return `data:image/png;base64,${data}`;
    } catch (error) {
      return null;
    }
  }, [id]);

  return <Avatar src={identiconImage} />;
};

export default IdenticonAvatar;
