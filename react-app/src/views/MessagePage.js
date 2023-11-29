import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import CarouselComp from "../components/Messaging";
import { useAuth } from "../hooks/useAuth";

const MessagePage = () => {
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUserList();
  }, [user]);

  const fetchUserList = async () => {
    try {
      // Use the authenticated user's ID from the useAuth hook
      const response = await fetch(`http://localhost:3500/messages/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user list. Status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming the response structure is an array of objects with user_id and other_user_id properties
      const userList = data.map(entry => ({
        user_id: entry.user_id,
        other_user_id: entry.other_user_id,
        name: entry.name, // Add the name property from the API response
      }));

      setUserList(userList);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      // Assuming you have a function that fetches messages for a specific user
      const response = await fetch(`http://localhost:3500/messages/${userId}`); // Replace with your actual endpoint

      if (!response.ok) {
        throw new Error(`Failed to fetch messages. Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleUserClick = (userId) => {
    // Set the selected user and fetch messages for that user
    setSelectedUserId(userId);
    fetchMessages(userId);
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* User List on the left */}
        <Col md={3}>
          <Card className="text-center bg-light">
            <Card.Body>
              <Card.Title>
                <h1>User List</h1>
              </Card.Title>
              <ul>
                {userList.map((user) => (
                  <li key={user.user_id} onClick={() => handleUserClick(user.user_id)}>
                    {user.name}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Messaging History on the right */}
        <Col md={9}>
          <Card className="text-center bg-light">
            <Card.Body>
              <Card.Title>
                <h1>Messages</h1>
              </Card.Title>
              {selectedUserId ? (
                <>
                  <p>Selected User: {selectedUserId}</p>
                  {/* Assuming CarouselComp needs to be updated to use the new messages structure */}
                  <CarouselComp messages={messages} />
                </>
              ) : (
                <p>Select a user to view messages.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MessagePage;
