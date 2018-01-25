/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';

// Styled Components buttons
const Button = styled.button`
  border-radius: 20px;
  padding: 0.15em 0.75em;
  margin: 0 1em;
  background: white;
  color: #323f48;
  border: 1.5px solid #323f48;
  
  ${props => props.primary && css`
    background: #323f48;
    color: white;
  `}
`;

render(
  <div>
    <Button primary>Offer feedback</Button>
    <Button>View feedback</Button>
  </div>
);