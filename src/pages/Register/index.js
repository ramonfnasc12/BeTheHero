import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    uf: "",
    whatsapp: "",
    city: ""
  });

  const history = useHistory();

  function updateForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post("ongs", {
        ...form
      });
      alert(`Seu ID de acesso ${response.data.id}`);
      history.push('/');
      console.log(response);
    } catch (e) {
      alert("Erro no cadastro, tenta novamente");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color={"#E02041"} />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            name="name"
            value={form.name}
            onChange={updateForm}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={form.email}
            onChange={updateForm}
          />
          <input
            placeholder="Whatsapp"
            name="whatsapp"
            value={form.whatsapp}
            onChange={updateForm}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              name="city"
              value={form.city}
              onChange={updateForm}
            />
            <input
              placeholder="UF"
              name="uf"
              style={{ width: 80 }}
              value={form.uf}
              onChange={updateForm}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
