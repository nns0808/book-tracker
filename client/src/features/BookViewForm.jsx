// src/features/BookViewForm.jsx
import { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const StyledInput = styled.input`
  padding: 0.3rem;
`;

const StyledButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
`;

// Component
function BookViewForm({ queryString, setQueryString, clearError, setCurrentPage }) {
  const [localQueryString, setLocalQueryString] = useState(queryString || "");

  // Debounced search
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
      setCurrentPage(1);
      if (clearError) clearError();
    }, 300);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString, setCurrentPage, clearError]);

  // Sync local input with external queryString
  useEffect(() => {
    setLocalQueryString(queryString || "");
  }, [queryString]);

  const preventRefresh = (e) => e.preventDefault();

  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledLabel>
        Search book:
        <StyledInput
          type="text"
          placeholder="Type to filter..."
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
      </StyledLabel>

      <StyledButton
        type="button"
        onClick={() => {
          setLocalQueryString("");
          setCurrentPage(1);
        }}
      >
        Clear
      </StyledButton>
    </StyledForm>
  );
}

export default BookViewForm;