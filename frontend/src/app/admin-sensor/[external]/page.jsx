"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { get, set, useForm } from "react-hook-form";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  buscar_mota,
  get_tipos,
  modify_mota,
  update_mota,
} from "@/hooks/Service_mota";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function Editar(params) {
  const router = useRouter();
  let token = Cookies.get("token");
  let [mota, setMotas] = useState(null);
  let [estado, setEstado] = useState(null);
  let [tiposMota, setTiposMota] = useState(null);

  useEffect(() => {
    if (!estado) {
      get_tipos(token).then((info) => {
        if (info.code == "200") {
          setTiposMota(info.datos);
        } else {
          setTiposMota([]);
        }
      });
      setEstado(true);
    }
  }, [estado, token]);

  useEffect(() => {
    if (!mota) {
      buscar_mota(token, params.params).then((info) => {
        if (info.code == "200") {
          setMotas(info.datos);
        }
        setEstado(true);
      });
    }
  }, [mota, token, params.params]);

  const validationSchema = Yup.object().shape({
    tipo: Yup.string().trim().required("El tipo de mota es requerido"),
    latitud: Yup.number().required("La latitud es requerida"),
    longitud: Yup.number().required("La longitud es requerida"),
    ip_sensor: Yup.string().trim().required("La ip del sensor es requerida"),
    estado: Yup.boolean().required("El estado de la mota es requerido"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  let { errors } = formState;

  useEffect(() => {
    if (!mota && params.params) {
      buscar_mota(token, params.params).then((info) => {
        if (info.code == "200") {
          setMotas(info.datos);
          setValue("tipo", info.datos.tipo.toLowerCase());
          setValue("latitud", info.datos.latitud);
          setValue("longitud", info.datos.longitud);
          setValue("ip_sensor", info.datos.ip_sensor);
          setValue("estado", info.datos.estado);
        }
        setEstado(true);
      });
    }
  }, [params.params, mota, setValue, token]);

  const sendInfo = async (data) => {
    const info = await modify_mota(data, params.params, token);

    console.log(info);
    if (info && info.status == "200") {
      swal({
        title: "Registro exitoso",
        text: "Mota actulizada correctamente",
        icon: "success",
        button: "Aceptar",
        timer: 4000,
        closeOnEsc: true,
      });
      router.push("/admin-sensor");
    } else {
      swal({
        title: "Error",
        text: info ? info.datos.error : "Error desconocido",
        icon: "error",
        button: "Aceptar",
        timer: 4000,
        closeOnEsc: true,
      });
    }
  };
  // Añade setValue y token a las dependencias si es necesario
  return (
    <div className="flex" >
      {" "}
      <div className="flex-grow">
        {" "}
        <DefaultLayout />
        <div
          className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5"
          style={{
            width: "60%",
            borderRadius: "15px",
            margin: "auto",
            marginTop: "200px",
            marginLeft: "400px",
            position: "fixed",
            //transform: "translateX(-50%)",
            top: 0,
          }}
        >
          <div className="mx-auto max-w-7xl">
            <form onSubmit={handleSubmit(sendInfo)} className="form-signin">
              <div className="mb-3" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <label className="form-label" style={{ marginRight: '1rem' }}>Ubicacion del sensor:</label>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      {...register("latitud")}
                      name="latitud"
                      placeholder="Latitud"
                      className="form-control"
                    />
                    {errors.latitud && <div>{errors.latitud?.message}</div>}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="Longitud"
                      {...register("longitud")}
                      placeholder="Longitud"
                      className="form-control"
                    />
                    {errors.longitud && <div>{errors.longitud?.message}</div>}
                  </div>
                </div>
              </div>
              <div className="col">
              <label className="form-label" style={{ marginRight: '1rem' }}>IP del sensor:</label>
                <input
                  type="text"
                  {...register("ip_sensor")}
                  name="ip_sensor"
                  placeholder="Ip del sensor"
                  className="form-control"
                />
                {errors.ip_sensor && <div>{errors.ip_sensor?.message}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Estado de la Mota:</label>
                <select
                  name="estado"
                  {...register("estado", {
                    setValueAs: (value) => value === "true",
                  })}
                  className="form-control"
                >
                  <option value="">Selecciona...</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
                {errors.estado && <div>{errors.estado?.message}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Tipo de Sensor:</label>
                <select
                  name="tipo"
                  {...register("tipo")}
                  className="form-control"
                >
                  <option value="">Selecciona...</option>
                  {tiposMota &&
                    tiposMota.map((status, index) => (
                      <option key={index} value={status.toLowerCase()}>
                        {status}
                      </option>
                    ))}
                </select>
                {errors.tipo && <div>{errors.tipo?.message}</div>}
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-primary w-100"
                style={{
                  borderRadius: "20px",
                  borderColor: '#83949E',
                  backgroundColor: '#83949E',
                  color: "white",
                }}
              >
                Modificar Mota
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
