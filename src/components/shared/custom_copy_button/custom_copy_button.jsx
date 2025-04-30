import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { Icon } from "@iconify/react";

function CustomCopyButton(props) {
  return (
    <CopyButton value={props.value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy} aria-label="Copy to clipboard" title="Copy to clipboard" radius="xl" size="sm" {...props}>
            {copied ? <Icon icon="line-md:check-all" width="16" height="16" /> : <Icon icon="line-md:text-box-multiple-twotone" width="16" height="16" />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CustomCopyButton;
