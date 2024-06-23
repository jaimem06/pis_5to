"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import swal from "sweetalert";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { modificar_credenciales } from "@/hooks/servicio_persona";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface FormData {
  correo: string;
  nuevo_correo: string;
  clave: string;
  nueva_clave: string;
  confirmar_clave: string;
}

const FormularioCredenciales = () => {
  const router = useRouter();
  const external = useParams().ext;
  console.log(external);
  const validationSchema = Yup.object().shape({
    correo: Yup.string()
      .email("Correo inválido")
      .required("El correo actual es requerido"),
    nuevo_correo: Yup.string()
      .email("Correo inválido")
      .notOneOf(
        [Yup.ref("correo")],
        "El nuevo correo debe ser diferente al actual",
      )
      .required("El nuevo correo es requerido"),
    clave: Yup.string().required("La clave actual es requerida"),
    nueva_clave: Yup.string()
      .notOneOf(
        [Yup.ref("clave")],
        "La nueva clave debe ser diferente a la actual",
      )
      .min(8, "La nueva clave debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#~!%*?&])[A-Za-z\d@$#~!%*?&]{8,20}$/,
        "La clave debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
      )
      .required("La nueva clave es requerida"),
    confirmar_clave: Yup.string()
      .oneOf([Yup.ref("nueva_clave")], "Las claves deben coincidir")
      .required("La confirmación de la clave es requerida"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm<FormData>(formOptions);
  const errors = formState.errors;

  const enviar_data = (data: FormData) => {
    modificar_credenciales(data, external).then((info) => {
      if (info && info.code === 200) {
        swal({
          title: "Éxito",
          text: info.data.tag,
          icon: "success",
          timer: 6000,
        });
        router.push("/admin-usuario");
      } else {
        swal({
          title: "Error",
          text: info.datos.error,
          icon: "error",
          timer: 6000,
        });
      }
    });
  };

  const cancelar = () => {
    router.push("/admin-usuario");
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Modificar Credenciales" />
      </div>
      <form
        className="mx-auto max-w-md rounded-[10px] border border-stroke bg-white p-4 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5"
        onSubmit={handleSubmit(enviar_data)}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-dark dark:text-white"
            htmlFor="correoActual"
          >
            Correo Actual
          </label>
          <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.28567 2.7085H11.713C13.2445 2.70848 14.4575 2.70847 15.4069 2.83611C16.3839 2.96747 17.1747 3.24423 17.7983 3.86787C18.4219 4.4915 18.6987 5.28229 18.8301 6.25931C18.9577 7.20866 18.9577 8.42169 18.9577 9.95315V10.0472C18.9577 11.5786 18.9577 12.7917 18.8301 13.741C18.6987 14.718 18.4219 15.5088 17.7983 16.1325C17.1747 16.7561 16.3839 17.0329 15.4069 17.1642C14.4575 17.2919 13.2445 17.2918 11.713 17.2918H8.28567C6.75421 17.2918 5.54118 17.2919 4.59183 17.1642C3.61481 17.0329 2.82402 16.7561 2.20039 16.1325C1.57675 15.5088 1.29999 14.718 1.16863 13.741C1.04099 12.7917 1.041 11.5786 1.04102 10.0472V9.95315C1.041 8.42168 1.04099 7.20866 1.16863 6.25931C1.29999 5.28229 1.57675 4.4915 2.20039 3.86787C2.82402 3.24423 3.61481 2.96747 4.59183 2.83611C5.54118 2.70847 6.7542 2.70848 8.28567 2.7085ZM4.75839 4.07496C3.91998 4.18768 3.43694 4.39907 3.08427 4.75175C2.73159 5.10442 2.5202 5.58746 2.40748 6.42587C2.29234 7.28226 2.29102 8.41115 2.29102 10.0002C2.29102 11.5892 2.29234 12.7181 2.40748 13.5745C2.5202 14.4129 2.73159 14.8959 3.08427 15.2486C3.43694 15.6013 3.91998 15.8126 4.75839 15.9254C5.61478 16.0405 6.74367 16.0418 8.33268 16.0418H11.666C13.255 16.0418 14.3839 16.0405 15.2403 15.9254C16.0787 15.8126 16.5618 15.6013 16.9144 15.2486C17.2671 14.8959 17.4785 14.4129 17.5912 13.5745C17.7064 12.7181 17.7077 11.5892 17.7077 10.0002C17.7077 8.41115 17.7064 7.28226 17.5912 6.42587C17.4785 5.58746 17.2671 5.10442 16.9144 4.75175C16.5618 4.39907 16.0787 4.18768 15.2403 4.07496C14.3839 3.95982 13.255 3.9585 11.666 3.9585H8.33268C6.74367 3.9585 5.61478 3.95982 4.75839 4.07496ZM4.51921 6.26671C4.74019 6.00154 5.13429 5.96571 5.39946 6.18669L7.19854 7.68592C7.97601 8.33381 8.51579 8.78218 8.9715 9.07527C9.41263 9.35899 9.71179 9.45423 9.99935 9.45423C10.2869 9.45423 10.5861 9.35899 11.0272 9.07527C11.4829 8.78218 12.0227 8.33381 12.8002 7.68592L14.5992 6.18669C14.8644 5.96571 15.2585 6.00154 15.4795 6.26671C15.7005 6.53189 15.6646 6.92599 15.3995 7.14697L13.5691 8.67231C12.8304 9.28785 12.2318 9.78676 11.7034 10.1266C11.153 10.4806 10.6169 10.7042 9.99935 10.7042C9.38179 10.7042 8.84574 10.4806 8.29533 10.1266C7.76695 9.78677 7.16828 9.28786 6.42965 8.67232L4.59923 7.14697C4.33406 6.92599 4.29823 6.53189 4.51921 6.26671Z"
                          fill=""
                        />
                      </svg>
                    </span>
          <input
            type="email"
            id="correoActual"
            {...register("correo")}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
          {errors.correo && (
            <div className="text-danger mt-1">{errors.correo?.message}</div>
          )}
        </div>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-dark dark:text-white"
            htmlFor="nuevo_correo"
          >
            Correo Nuevo
          </label>
          <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.28567 2.7085H11.713C13.2445 2.70848 14.4575 2.70847 15.4069 2.83611C16.3839 2.96747 17.1747 3.24423 17.7983 3.86787C18.4219 4.4915 18.6987 5.28229 18.8301 6.25931C18.9577 7.20866 18.9577 8.42169 18.9577 9.95315V10.0472C18.9577 11.5786 18.9577 12.7917 18.8301 13.741C18.6987 14.718 18.4219 15.5088 17.7983 16.1325C17.1747 16.7561 16.3839 17.0329 15.4069 17.1642C14.4575 17.2919 13.2445 17.2918 11.713 17.2918H8.28567C6.75421 17.2918 5.54118 17.2919 4.59183 17.1642C3.61481 17.0329 2.82402 16.7561 2.20039 16.1325C1.57675 15.5088 1.29999 14.718 1.16863 13.741C1.04099 12.7917 1.041 11.5786 1.04102 10.0472V9.95315C1.041 8.42168 1.04099 7.20866 1.16863 6.25931C1.29999 5.28229 1.57675 4.4915 2.20039 3.86787C2.82402 3.24423 3.61481 2.96747 4.59183 2.83611C5.54118 2.70847 6.7542 2.70848 8.28567 2.7085ZM4.75839 4.07496C3.91998 4.18768 3.43694 4.39907 3.08427 4.75175C2.73159 5.10442 2.5202 5.58746 2.40748 6.42587C2.29234 7.28226 2.29102 8.41115 2.29102 10.0002C2.29102 11.5892 2.29234 12.7181 2.40748 13.5745C2.5202 14.4129 2.73159 14.8959 3.08427 15.2486C3.43694 15.6013 3.91998 15.8126 4.75839 15.9254C5.61478 16.0405 6.74367 16.0418 8.33268 16.0418H11.666C13.255 16.0418 14.3839 16.0405 15.2403 15.9254C16.0787 15.8126 16.5618 15.6013 16.9144 15.2486C17.2671 14.8959 17.4785 14.4129 17.5912 13.5745C17.7064 12.7181 17.7077 11.5892 17.7077 10.0002C17.7077 8.41115 17.7064 7.28226 17.5912 6.42587C17.4785 5.58746 17.2671 5.10442 16.9144 4.75175C16.5618 4.39907 16.0787 4.18768 15.2403 4.07496C14.3839 3.95982 13.255 3.9585 11.666 3.9585H8.33268C6.74367 3.9585 5.61478 3.95982 4.75839 4.07496ZM4.51921 6.26671C4.74019 6.00154 5.13429 5.96571 5.39946 6.18669L7.19854 7.68592C7.97601 8.33381 8.51579 8.78218 8.9715 9.07527C9.41263 9.35899 9.71179 9.45423 9.99935 9.45423C10.2869 9.45423 10.5861 9.35899 11.0272 9.07527C11.4829 8.78218 12.0227 8.33381 12.8002 7.68592L14.5992 6.18669C14.8644 5.96571 15.2585 6.00154 15.4795 6.26671C15.7005 6.53189 15.6646 6.92599 15.3995 7.14697L13.5691 8.67231C12.8304 9.28785 12.2318 9.78676 11.7034 10.1266C11.153 10.4806 10.6169 10.7042 9.99935 10.7042C9.38179 10.7042 8.84574 10.4806 8.29533 10.1266C7.76695 9.78677 7.16828 9.28786 6.42965 8.67232L4.59923 7.14697C4.33406 6.92599 4.29823 6.53189 4.51921 6.26671Z"
                          fill=""
                        />
                      </svg>
                    </span>
          <input
            type="email"
            id="nuevo_correo"
            {...register("nuevo_correo")}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
          {errors.nuevo_correo && (
            <div className="text-danger mt-1">
              {errors.nuevo_correo?.message}
            </div>
          )}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-dark dark:text-white"
            htmlFor="clave"
          >
            Clave Actual
          </label>
          <input
            type="password"
            id="clave"
            {...register("clave")}
            className="w-full rounded border border-[#eee] px-3 py-2 dark:border-dark-3"
          />
          {errors.clave && (
            <div className="text-danger mt-1">{errors.clave?.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-dark dark:text-white"
            htmlFor="nueva_clave"
          >
            Nueva Clave
          </label>
          <input
            type="password"
            id="nueva_clave"
            {...register("nueva_clave")}
            className="w-full rounded border border-[#eee] px-3 py-2 dark:border-dark-3"
          />
          {errors.nueva_clave && (
            <div className="text-danger mt-1">
              {errors.nueva_clave?.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-dark dark:text-white"
            htmlFor="confirmar_clave"
          >
            Confirmar Nueva Clave
          </label>
          <input
            type="password"
            id="confirmar_clave"
            {...register("confirmar_clave")}
            className="w-full rounded border border-[#eee] px-3 py-2 dark:border-dark-3"
          />
          {errors.confirmar_clave && (
            <div className="text-danger mt-1">
              {errors.confirmar_clave?.message}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={cancelar}
            className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
          >
            Guardar
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default FormularioCredenciales;