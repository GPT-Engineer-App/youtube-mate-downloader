import { useState } from "react";
import { Container, VStack, Input, Button, Select, Text, Box, Heading } from "@chakra-ui/react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("360p");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Mock API endpoint for testing
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
      if (!response.ok) {
        throw new Error("Failed to download video");
      }
      const data = await response.json();
      console.log(data); // Log the response data for debugging
      setSuccess("Download started successfully!");
    } catch (err) {
      console.error("Error details:", err); // Log the error details for debugging
      setError(err.message);
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
      </VStack>
    </Container>
  );
};

export default Index;