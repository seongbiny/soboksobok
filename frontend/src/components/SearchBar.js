import React from 'react';
import { Form, Button, Stack } from 'react-bootstrap';

import styled from 'styled-components';

const 박스 = styled.div`
  padding: 20px;
`;

function SearchBar() {
  return (
    <div>
      <박스>
        <Stack direction="horizontal" gap={3}>
          <Form.Control className="me-auto" placeholder="궁금한 복지를 검색해보세요..." />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </박스>
    </div>
  );
}

export default SearchBar;
