// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';



const Spoiler = ({ header = "+", open, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleSpoiler = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div style={{ marginBottom: '10px' }}>
      <div
        onClick={toggleSpoiler}
        style={{
          cursor: 'pointer',
          backgroundColor: 'blue',
          padding: '5px',
          borderRadius: '5px',
          marginBottom: '5px',
        }}
      >
        {header}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
const RangeInput = ({ min, max, ...rest }) => {
  const [text, setText] = useState("test")
  const [value, setValue] = useState('')
  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  const inputStyle = {
    border: (value.length < min || value.length > max) ? '4px solid red' : '2px solid black'
  }
  return (
    <input
      type="text"
      style={inputStyle}
      onChange={onChange}
      value={value}
      {...rest}
    />)

}
const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const loginButton = () => {
    if (login && password) {
      onLogin(login, password)
    }
  }
  return (
    <div>
      <input type="text"
        placeholder='Логін'
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input type="text"
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginButton} disabled={!login || !password}> Увійти</button>
    </div>
  )
}

const PasswordConfirm =({min})=>{
  const [password, setPassword] =useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const onChangePassword = (e) => {
    const  value  = e.target.value;
    setPassword(value);
  };
  const onChangePasswordConfirm = (e) => {
    const  value  = e.target.value;
    setPasswordConfirm(value);
  };
  const passButton = () => {
    if (
      password.length < min ||
      password !== passwordConfirm ||
      /\d/.test(password) === false
    )  {
      alert('Паролі повинні співпадати і містити цифри ' );
    } else {
      alert('Паролі успішно введено');
    }
  };
  const inputStyle = {
    border:
      (password.length < min ||
      passwordConfirm.length < min ||
      password !== passwordConfirm ||
      /\d/.test(password) === false) ? '4px solid red' : '2px solid black',
  };
  console.log('inputStyle:', inputStyle);
  return(
    <div>
      <input type="text"
        placeholder='Пароль'
        value={password}
        onChange={onChangePassword}
      />
      <input type="text"
        placeholder='Підтвердіть пароль'
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
      />
      <button onClick={passButton} disabled={!password || !passwordConfirm}> 
      Ввести
      </button>
    </div>
  )
}

const Carousel = ({ images }) => {
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    const handleChange = (index) => {
      setCurrentIndex(index);
    };
  const imagesStyle ={
    maxWidth :"250px",
    maxHight:"250px"
  }

  return (
    <div className="carousel">
      <div className="main-image-container" onClick={handleNext}>
        <img src={images[currentIndex]} alt="Main" />
      </div>
      <Thumbnails images={images} current={currentIndex} onChange={handleChange} />
      <button className="prev-button" onClick={handlePrev}>
        Prev
      </button>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>

    
  );
};

const Thumbnails = ({ images, current, onChange }) => {
  return (
    <div className="thumbnails">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Thumbnail ${index}`}
          className={index === current ? 'active thumbnail' : 'thumbnail'}
          onClick={() => onChange(index)}
        />
      ))}
    </div>
  );
};

const Content = ({page}) => 
<div style={{fontSize: '5em'}}>
    Сторінка №{page}
</div>

const Color = ({page}) =>
<div style={{color: `rgb(${page*16},${page*16},${page*16})`}}>
    {page}
</div>

const Pagination = ({render, max}) => {
    const Render = render
    const [page, setPage] = React.useState(1);
    const [buttonStates, setButtonStates] = React.useState(Array.from({ length: max }, (_, index) => index === 0));

    const updateButtonStates = (newPage) => {
        const newButtonStates = buttonStates.map((_, index) => index === newPage - 1);
        setButtonStates(newButtonStates);
    };

    const handleButtonClick = (newPage) => {
        if (newPage < 1) {
            newPage = 1;
        }
        if (newPage > max) {
            newPage = max;
        }
        setPage(newPage);
        updateButtonStates(newPage);
    };
    return (
      <div>
      <Render page={page} />
      <div>
                <button onClick={() => handleButtonClick(1)} disabled={buttonStates[0]}>««</button>
                <button onClick={() => handleButtonClick(page - 1)} disabled={buttonStates[page - 2]}>«</button>
                {[...Array(max)].map((_, index) => (
                    <button key={index + 1} onClick={() => handleButtonClick(index + 1)} disabled={buttonStates[index]}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => handleButtonClick(page + 1)} disabled={buttonStates[page]}>»</button>
                <button onClick={() => handleButtonClick(max)} disabled={buttonStates[max - 1]}>»»</button>
            </div>
  </div>
    )
}

function App() {
  const loginButton = (login, password) => {
    alert('Логін:' + login + ' \n' + 'Пароль:' + password);

  }
  const  images=["https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-1.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-2.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-3.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-4.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-5.jpg"] 
  return (
    <div className="App">
      <header className="App-header">

        <Spoiler header={<h1>Заголовок 1</h1>} open>
          Параграф 1
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </Spoiler>
        <Spoiler header={<h2>Заголовок 2</h2>}>
          Параграф 2
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </Spoiler>

      </header>
      <RangeInput min={2} max={10} />
      <LoginForm onLogin={loginButton}></LoginForm>
      <PasswordConfirm min={2} />
      <Carousel images={images} />
      <Pagination max={10} render={Content} />
      <Pagination max={16} render={Color} />
    </div>

  );
}

export default App;


