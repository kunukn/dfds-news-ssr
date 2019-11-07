import CloseIcon from '~/public/icons/Close.svg'

const ButtonClose = ({ onClick, className }) => {
  return (
    <>
      <button aria-label='close' onClick={onClick} className={className}>
        <CloseIcon />
      </button>

      <style jsx>{`
        button {
          font-size: 100%;
          padding: 10px;
          box-shadow: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          color: gray;
          background: none;
        }
      `}</style>
    </>
  )
}

export default ButtonClose
