import { Button, HStack, useToast } from "@chakra-ui/react";
import { FiCopy, FiShare2 } from "react-icons/fi";

interface Props {
  title: string;
}

const ShareButtons = ({ title }: Props) => {
  const toast = useToast();
  const url = typeof window === "undefined" ? "" : window.location.href;
  const encodedText = encodeURIComponent(`${title} on NexusPlay`);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", status: "success", duration: 1800 });
    } catch {
      toast({ title: "Copy failed", status: "warning", duration: 1800 });
    }
  };

  return (
    <HStack spacing={2} flexWrap="wrap">
      <Button leftIcon={<FiCopy />} size="sm" onClick={copyLink}>
        Copy Link
      </Button>
      <Button
        as="a"
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        leftIcon={<FiShare2 />}
        size="sm"
      >
        WhatsApp
      </Button>
      <Button
        as="a"
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        leftIcon={<FiShare2 />}
        size="sm"
      >
        X
      </Button>
    </HStack>
  );
};

export default ShareButtons;
