import styled from '@emotion/styled'

export const CodeBlock = styled.pre`
  padding: 1.5rem;
  margin: 0.5rem 0;
  overflow: auto;
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 0.25rem;
  line-height: 1.4;

  & > code {
    font-family: 'Fira Code';
  }
`
