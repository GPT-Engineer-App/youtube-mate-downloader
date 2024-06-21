import { useState } from "react";
import { Container, VStack, Input, Button, Select, Text, Box, Heading } from "@chakra-ui/react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("360p");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidYouTubeUrl = (url) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setDownloadLink("");

    if (!isValidYouTubeUrl(url)) {
      setError("Please enter a valid YouTube URL.");
      setLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

      const response = await fetch(`https://api.example.com/download?url=${encodeURIComponent(url)}&format=${format}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to download video");
      }

      const data = await response.json();
      if (data.status !== "success") {
        throw new Error(data.message || "Failed to download video");
      }

      setDownloadLink(data.downloadUrl);
      setSuccess("Download ready! Click the link below to save the video.");
    } catch (err) {
      if (err.name === 'AbortError') {
        setError("The request timed out. Please try again.");
      } else {
        console.error("Error details:", err); // Log the error details for debugging
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>YouTube Downloader</Heading>
        <Input
          placeholder="Paste YouTube link here"
          size="lg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Select size="lg" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="360p">360p</option>
          <option value="480p">480p</option>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
          <option value="4k">4k</option>
          <option value="mp3">mp3</option>
        </Select>
        <Button size="lg" colorScheme="blue" onClick={handleDownload} isLoading={loading}>
          Download
        </Button>
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
        {downloadLink && (
          <Box>
            <a href={downloadLink} download="video.mp4">
              <Button size="lg" colorScheme="green">Save Video</Button>
            </a>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;