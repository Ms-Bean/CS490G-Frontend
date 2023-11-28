import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

const Messages = () => {
  const [formData, setFormData] = useState({
    recipient_id: 2, 
    content: "",
  });

  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          ...formData,
          content: "",
        });
        // Fetch and update messages after sending a new message
        fetchMessages();
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3500/messages?other_user_id=${formData.recipient_id}&page_size=10&page_num=1`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch messages on component mount
    fetchMessages();
  }, [formData.recipient_id]);

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={4}>
          {/* Message List */}
          <ListGroup>
            {messages.map((message) => (
              <ListGroup.Item key={message.message_id}>
                <strong>{message.sender_id}:</strong> {message.content}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={8}>
          {/* Message Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="content">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your message..."
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;
