import { Box, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { Dropzone, type DropzoneProps } from "@mantine/dropzone";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import type { FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";

type ImageDropzoneProps = Partial<DropzoneProps> & {
  files: any;
  setFiles: React.Dispatch<any>;
  errors: FieldErrors;
  isSubmitting: boolean;
};

export default function ImageDropzone({
  files,
  setFiles,
  errors,
  isSubmitting,
  ...props
}: ImageDropzoneProps) {
  function removeFile(fileToRemove: any) {
    setFiles(files.filter((file: any) => file !== fileToRemove));
    toast.info("Photo removed");
  }

  function displayFileError(files: any) {
    files.forEach((file: any) => {
      console.log(file);
      const errors = file.errors;
      const fileName = truncateFileName(file.file.name);

      errors.forEach((error: any) => {
        if (error.code === "file-invalid-type") {
          toast.error(`${fileName}: Invalid file type`);
        } else if (error.code === "file-too-large") {
          toast.error(`${fileName}: File can't exceed 5mb`);
        }
      });
    });
  }

  function truncateFileName(name: string): string {
    if (name.length <= 10) {
      return name;
    }

    const charsToShow = 10 - 3;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return (
      name.substring(0, frontChars) +
      "..." +
      name.substring(name.length - backChars)
    );
  }

  const uploadedFiles = files.map((file: any) => (
    <Box
      key={`${file.name}-${file.size}`}
      style={{
        position: "relative",
        width: 100,
        height: 100,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <img
        key={`${file.name}-${file.size}`}
        src={URL.createObjectURL(file)}
        alt={file.name}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
      <Button
        bg="red.9"
        style={{ position: "absolute", bottom: 4, right: 4 }}
        onClick={() => removeFile(file)}
      >
        <ClearIcon />
      </Button>
    </Box>
  ));

  return (
    <>
      <Dropzone
        mt="xl"
        onDrop={(files) => {
          setFiles(files);
        }}
        onReject={(files) => displayFileError(files)}
        maxSize={5 * 1024 ** 2}
        maxFiles={10}
        accept={["image/png", "image/jpeg"]}
        {...props}
        h="130"
        c={errors.files && "red.7"}
        styles={
          errors.files && {
            root: {
              borderColor: "red",
            },
          }
        }
        disabled={isSubmitting}
      >
        <Group justify="center" gap="xl" mih={100}>
          <Dropzone.Accept>
            <CheckIcon fontSize="large" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <DoNotDisturbAltIcon fontSize="large" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <UploadFileIcon
              fontSize="large"
              style={{ color: isSubmitting ? "grey" : "" }}
            />
          </Dropzone.Idle>

          <Flex justify="center" align="center" direction="column">
            <Text size="xl" inline c={isSubmitting ? "dimmed" : ""}>
              Drag photos here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach up to 10 files, each file should not exceed 5mb
            </Text>
          </Flex>
        </Group>
      </Dropzone>

      {errors.files && (
        <Text size="md" mt="5px" c="red.8">
          {errors.files?.message as string}
        </Text>
      )}

      {files.length > 0 && (
        <Stack mt="xl" bg="dark.6" p="sm">
          <Flex maw={700} wrap="wrap" gap="25px">
            {uploadedFiles}
          </Flex>
        </Stack>
      )}
    </>
  );
}
