import "./ImageInput.scss";
import defaultLogo from "../imgs/dixie.svg";

function ImageInput({ stateCheck, defaultValue, size, round }) {
  function changeImage(e) {
    const fileInput = document.querySelector("input[type=file]");
    const img = e.target;

    fileInput.click();

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    };
  }

  return (
    <div className="image-input">
      <img
        src={stateCheck ? defaultValue : defaultLogo}
        alt="Bot logo"
        className={`image-input__img ${size} ${round}`}
        onClick={(e) => {
          changeImage(e);
        }}
      />
      <input type="file" accept="image/*" className="hide" />
    </div>
  );
}

export default ImageInput;
