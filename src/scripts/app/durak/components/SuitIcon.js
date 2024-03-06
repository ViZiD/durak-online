import styled from 'styled-components'

const IconStyle = styled.div`
  svg {
    width: 20px;
    height: 20px;
  }
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 0.4em;
  padding-right: 0.4em;
`

const Clubs = () => (
  <IconStyle>
    <svg
      version="1.1"
      viewBox="0 0 24.181 28.032"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m9.7413 12.109c-4.406-2.105-10.888 0.406-9.354 6.07 1.494 5.52 7.948 4.308 10.18 0.948-0.932 6.37-2.567 7.362-3.547 8.745h10.406c-1.054-1.479-2.969-2.375-4.091-8.832 2.249 3.354 9.01 4.517 10.482-0.923 1.449-5.351-5.083-8.399-9.425-5.976 4.164-2.797 5.66-11.981-2.228-11.981-7.966 0-6.637 9.364-2.423 11.949z"
        display="block"
        stroke="#fff"
        stroke-width=".32"
      />
    </svg>
  </IconStyle>
)

const Diamonds = () => (
  <IconStyle>
    <svg
      version="1.1"
      viewBox="0 0 24.407 35.892"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12.201 0.31445c-3.664 6.096-7.757 11.922-12 17.626 4.367 5.612 8.528 11.411 12 17.626 3.514-6.185 7.418-12.174 12-17.626a149.62 149.62 0 0 1-12-17.626z"
        fill="#f00"
        fill-rule="evenodd"
        stroke="#fff"
        stroke-width=".32"
      />
    </svg>
  </IconStyle>
)

const Hearts = () => (
  <IconStyle>
    <svg
      version="1.1"
      viewBox="0 0 24.322 25.975"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12 25.74a8.614 8.614 0 0 1-0.226-0.686c-0.639-2.119-1.825-4.265-3.81-6.896-0.746-0.988-1.449-1.863-3.347-4.172-2.199-2.672-2.829-3.528-3.465-4.709-0.375-0.696-0.764-1.758-0.892-2.434-0.128-0.675-0.13-1.778-5e-3 -2.352 0.511-2.337 2.587-4.1 5.069-4.306 2.843-0.235 5.261 1.202 6.532 3.88l0.284 0.598 0.214-0.472a6.567 6.567 0 0 1 1.138-1.77c1.314-1.508 2.877-2.247 4.76-2.25 0.843 0 1.326 0.07 2.045 0.297 1.075 0.34 1.884 0.87 2.605 1.706 1.878 2.177 1.656 5.144-0.658 8.778-0.54 0.848-1.513 2.102-2.853 3.675-1.542 1.81-2.295 2.73-3.067 3.745-1.85 2.432-3.093 4.643-3.777 6.712a6.04 6.04 0 0 1-0.243 0.654c-0.068 0.102-0.249 0.103-0.305 2e-3z"
        fill="#f00"
        stroke="#fff"
        stroke-width=".32"
      />
    </svg>
  </IconStyle>
)

const Spades = () => (
  <IconStyle>
    <svg
      version="1.1"
      viewBox="0 0 24.228 29.109"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4.1657 10.151c-9.45 9.654-0.186 16.657 7.285 12.048-1.41 5.03-2.186 5.425-3.043 6.75h8.067c-1.035-1.338-2.123-1.72-3.225-6.721 7.629 4.382 15.668-3.26 7.204-12.077-5.536-4.842-7.685-9.263-8.144-9.892-0.44 0.523-3.035 5.138-8.144 9.89z"
        fill-rule="evenodd"
        stroke="#fff"
        stroke-width=".32"
      />
    </svg>
  </IconStyle>
)

const icons = {
  hearts: <Hearts />,
  diamonds: <Diamonds />,
  clubs: <Clubs />,
  spades: <Spades />
}

export default ({ suit }) => icons[suit]
