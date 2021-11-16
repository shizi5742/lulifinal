// import React from "react";
// import emailjs from "emailjs-com";

// class Form extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       errors: {
//         name: "",
//         subject: "",
//         phone: "",
//         email: "",
//       },
//     };
//   }

//   handleChange = (event) => {
//     let name = event.target.name;
//     let value = event.target.value;
//     let errors = this.state.errors;

//     switch (name) {
//       case "name":
//         errors.name = value.length === 0 ? "Name is not empty" : "";
//         break;
//       case "subject":
//         errors.subject = value.length < 5 ? "Subject must be 5 characters" : "";
//         break;
//       case "phone":
//         errors.phone = value.length < 5 ? "phone is not empty" : "";
//         break;
//       case "email":
//         errors.email = value.length < 5 ? "Subject is not empty" : "";
//         let appos = value.indexOf("@");
//         let dots = value.lastIndexOf(".");

//         if (appos < 1 || dots - appos < 2) {
//           errors.email = "please enter valid email";
//         }

//         break;

//       default:
//         break;
//     }
//     this.setState({ errors, [name]: value });
//   };

//   submitHandler = (e) => {
//     e.preventDefault();
//     // if (
//     //   this.state.errors.name.length === 0 &&
//     //   this.state.errors.subject.length === 0 &&
//     //   this.state.errors.phone.length === 0 &&
//     //   this.state.errors.email.length === 0
//     // ) {
//     //   alert("form is valid");
//     // } else {
//     //   alert("form is invalid");
//     // }
//     emailjs
//       .sendForm(
//         "gmail",
//         "template_zo1q2mh",
//         e.target,
//         "user_vvQtVRIgqRETJC2JHOJz9"
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//           alert("form is valid");
//         },
//         (error) => {
//           console.log(error.text);
//           alert("form is invalid");
//         }
//       );
//   };

//   render() {
//     const { errors } = this.state;
//     return (
//       <form onSubmit={this.submitHandler.bind(this)} className="form_class">
//         <div className="row">
//           <div className="col-lg-6">
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="form-control"
//               placeholder="Your Name*"
//               onChange={this.handleChange}
//             />
//             <p>{errors.name}</p>
//           </div>
//           <div className="col-lg-6">
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               placeholder="Your Email*"
//               onChange={this.handleChange}
//             />
//             <p>{errors.email}</p>
//           </div>
//           <div className="col-lg-6">
//             <input
//               type="text"
//               id="subject"
//               name="subject"
//               className="form-control"
//               placeholder="Subject*"
//               onChange={this.handleChange}
//             />
//             <p>{errors.subject}</p>
//           </div>
//           <div className="col-lg-6">
//             <input
//               type="text"
//               className="form-control"
//               id="phone"
//               name="phone"
//               placeholder="Phone*"
//               onChange={this.handleChange}
//             />
//             <p>{errors.phone}</p>
//           </div>
//         </div>
//         <textarea
//           name="message"
//           id="message"
//           className="form-control"
//           rows="6"
//           placeholder="Your Message ..."
//           onChange={this.handleChange}
//         ></textarea>
//         <button type="submit" className="btn send_btn theme_btn">
//           Send Message
//         </button>
//       </form>
//     );
//   }
// }

// export default Form;


import React from "react";
import axios from "axios";
const URL =  `https://jzapbtk713.execute-api.us-east-1.amazonaws.com/v1/contact`;
const initialError = {
  nameError: "",
  subjectError: "",
  emailError: "",
  messageError: ""
};
const initialData = {
  name: "",
  subject: "",
  phone: "",
  email: "",
  content: ""
};
const successMessage="Request sent successfully"
const failedMessage="Failed ,try again"
class Form extends React.Component {
  state = {
    errors: { ...initialError },
    data: { ...initialData }
  };

  handleChange = (event) => {
    const copy = {
      ...this.state.data,
      [event.target.name]: event.target.value
    };
    this.setState({ data: copy });
  };
  validationInput = () => {
    const nameError = this.state.data.name ? "" : "Name is required";
    const emailError = this.state.data.email ? "" : "Email is required";
    const subjectError = this.state.data.subject ? "" : "Subject is required";
    const messageError = this.state.data.content ? "" : "Message is required";
    const copy = {
      ...this.state.errors,
      nameError,
      emailError,
      subjectError,
      messageError
    };
    this.setState({ errors: copy });
  };
  submitHandler = async (e) => {
    e.preventDefault();
    this.validationInput();
    if (
      this.state.data.name &&
      this.state.data.email &&
      this.state.data.subject &&
      this.state.data.content
    ) {
      const response = await axios.post(URL, this.state.data);
      console.log(response.data)
      const resp = response.data === "Success"
          ? successMessage
          : failedMessage;
      if(resp===successMessage){
       this.setState({data:{...initialData}})
      }
       alert(resp);
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.submitHandler} className="form_class">
        <div className="row">
          <div className="col-lg-6">
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.data.name}
              className="form-control"
              placeholder="Your Name*"
              onChange={this.handleChange}
            />
            <p style={{ color: "red" }}>{errors.nameError}</p>
          </div>
          <div className="col-lg-6">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.data.email}
              placeholder="Your Email*"
              onChange={this.handleChange}
            />
            <p style={{ color: "red" }}>{errors.emailError}</p>
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
              value={this.state.data.subject}
              placeholder="Subject*"
              onChange={this.handleChange}
            />
            <p style={{ color: "red" }}>{errors.subjectError}</p>
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={this.state.data.phone}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <textarea
          name="content"
          id="message"
          className="form-control"
          rows="6"
          placeholder="Your Message ..."
          value={this.state.data.content}
          onChange={this.handleChange}
        ></textarea>
        <p style={{ color: "red" }}>{errors.messageError}</p>
        <button type="submit" className="btn send_btn theme_btn">
          Send Message
        </button>
      </form>
    );
  }
}

export default Form;
