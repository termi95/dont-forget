import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { UserRegister } from "../../types/User";
const userInitialState: UserRegister = {
  email: "",
  password: "",
  username: "",
};

const validationObjectState = {
  username: {
    hasProperMaxLength: true,
    hasProperMinLength: true,
  },
  email: {
    hasProperformat: true,
  },
  password: {
    hasDifferentCase: true,
    hasSpecialCharacter: true,
    hasNumber: true,
    hasProperlength: true,
  },
};

export const UseRegister = () => {
  const [user, setUser] = useState<UserRegister>(userInitialState);
  const [validation, setvalidationProperty] = useState(validationObjectState);
  const [shake, setShake] = useState(false);

  let navigate = useNavigate();
  const register = async () => {
    await api
      .post("/auth/register", user)
      .then((res) => {
        if (res.status === 201) {
          return navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateUserToRegister()) {
      register();
    } else {
      animate();
    }
  };
  const handleChange = (e: HTMLInputElement): void => {
    let newUserData = { ...user };
    let validation = true;
    if (e.name === "email") {
      newUserData.email = e.value;
      validation = checkIfUserEmailIsValid(e.value);
    } else if (e.name === "username") {
      newUserData.username = e.value;
      validation = checkIfUsernameIsValid(e.value);
    } else if (e.name === "password") {
      newUserData.password = e.value;
      validation = checkIfPasswordIsValid(e.value);
    }

    handleUIInfo(e, validation);
    setUser(newUserData);
  };

  function handleUIInfo(e: HTMLInputElement, validation: boolean): void {
    if (validation) {
      e.classList.remove("input-fail");
      e.classList.add("input-success");
    } else {
      e.classList.remove("input-success");
      e.classList.add("input-fail");
    }
  }
  function checkIfPasswordIsValid(password: string): boolean {
    resetPasswordValidationProperties();
    if (!(password.length >= 8)) {
      validation.password.hasProperlength = false;
    }
    if (!(password !== password.toLowerCase())) {
      validation.password.hasDifferentCase = false;
    }
    if (!password.match(/\d+/g)) {
      validation.password.hasNumber = false;
    }
    if (!password.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      validation.password.hasSpecialCharacter = false;
    }
    setvalidationProperty(validation);
    const {
      hasDifferentCase,
      hasNumber,
      hasProperlength,
      hasSpecialCharacter,
    } = validation.password;
    if (
      hasDifferentCase &&
      hasNumber &&
      hasProperlength &&
      hasSpecialCharacter
    ) {
      return true;
    }
    return false;
  }

  function resetPasswordValidationProperties() {
    validation.password.hasProperlength = true;
    validation.password.hasDifferentCase = true;
    validation.password.hasNumber = true;
    validation.password.hasSpecialCharacter = true;
  }

  function checkIfUsernameIsValid(username: string): boolean {
    resetUsernameValidProperty();
    if (username.length < 3) {
      validation.username.hasProperMinLength = false;
    }
    if (username.length > 32) {
      validation.username.hasProperMaxLength = false;
    }
    setvalidationProperty(validation);
    return (
      validation.username.hasProperMinLength &&
      validation.username.hasProperMaxLength
    );
  }

  function resetUsernameValidProperty() {
    validation.username.hasProperMinLength = true;
    validation.username.hasProperMaxLength = true;
  }

  function checkIfUserEmailIsValid(email: string): boolean {
    const validRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.match(validRegex)) {
      validation.email.hasProperformat = true;
      setvalidationProperty(validation);
      return true;
    }
    validation.email.hasProperformat = false;
    setvalidationProperty(validation);
    return false;
  }

  function validateUserToRegister(): boolean {
    return (
      checkIfUserEmailIsValid(user.email) &&
      checkIfUsernameIsValid(user.username) &&
      checkIfPasswordIsValid(user.password)
    );
  }

  function userNameValidationHandler() {
    const info = (
      <div>
        {!validation.username.hasProperMinLength && (
          <p className="fail-colort-text">Min length is 3 character.</p>
        )}
        {!validation.username.hasProperMaxLength && (
          <p className="fail-colort-text">Max length is 32 character.</p>
        )}
      </div>
    );
    return info;
  }
  function emailValidationHandler() {
    if (!validation.email.hasProperformat) {
      return <p className="fail-colort-text">Invalid email address.</p>;
    }
    return null;
  }
  function passwordValidationHandler() {
    const {
      hasDifferentCase,
      hasNumber,
      hasProperlength,
      hasSpecialCharacter,
    } = validation.password;
    let infoText = (
      <div>
        <span className="fail-colort-text">
          panassword requirements:
          <ul className="left">
            {!hasDifferentCase && <li>Lower nad uppercase letter.</li>}
            {!hasNumber && <li>At least one number.</li>}
            {!hasProperlength && <li>Minimum 8 character.</li>}
            {!hasSpecialCharacter && <li>Special character !@#$%^&*().</li>}
          </ul>
        </span>
        ;
      </div>
    );
    if (
      !hasDifferentCase ||
      !hasNumber ||
      !hasProperlength ||
      !hasSpecialCharacter
    ) {
      return infoText;
    }
  }
  const animate = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };
  return {
    handleSubmit,
    handleChange,
    userNameValidationHandler,
    emailValidationHandler,
    passwordValidationHandler,
    validateUserToRegister,
    shake,
  };
};
