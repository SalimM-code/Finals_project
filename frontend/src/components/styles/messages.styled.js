import styled from "styled-components";

export const Container = styled.div`
  .message-list {
    max-width: 500px;
    width: 100%;
  }

  .message-container {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    border-bottom: 1px solid #eeeeee;
  }

  .user,
  .date {
    font-size: 0.625rem;
    color: #888888;
  }

  .user {
    min-width: 120px;
  }

  .message {
    flex-grow: 1;
  }
`;
