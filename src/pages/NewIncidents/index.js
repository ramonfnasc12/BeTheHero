import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";

export default function NewIncident() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    value: ""
  });
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  function updateForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post(
        "incidents",
        {
          ...form
        },
        {
            headers:{
                Authorization:ongId
            }
        }
      );

      history.push("/profile");
    } catch (err) {
      alert("Não foi possível cadastrar");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título do caso"
            name="title"
            value={form.title}
            onChange={updateForm}
          />
          <textarea
            placeholder="Descrição"
            name="description"
            value={form.description}
            onChange={updateForm}
          />
          <input
            placeholder="Valor em reais"
            name="value"
            value={form.value}
            onChange={updateForm}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
