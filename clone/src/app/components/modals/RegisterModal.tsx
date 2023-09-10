'use client';

import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BiBriefcaseAlt2 } from "react-icons/bi"
import { IoSchoolOutline } from 'react-icons/io5'
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const RegisterModal= () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
      register, 
      handleSubmit,
      formState: {
        errors,
      },
    } = useForm<FieldValues>({
      defaultValues: {
        name: '',
        email: '',
        password: '',
        assoUser: false
      },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      console.log(data)

      axios.post('/api/register', data)
      .then(() => {
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }

    const onToggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    }, [registerModal, loginModal])

      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Bienvenue sur KampusView"
            subtitle="Créer un compte"
          />
          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="name"
            label="Nom"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Mot de passe"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <div className="flex flex-row gap-4">
            <Button  
              outline
              label="Je suis une association"
              icon={IoSchoolOutline}
              onClick={() => {}} 
            />
            <Button  
              label="Je suis une entreprise"
              icon={BiBriefcaseAlt2}
              onClick={() => {}}
            />
          </div>
        </div>
      )
    
      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button 
            outline 
            label="S'inscrire avec Google"
            icon={FcGoogle}
            onClick={() => signIn('google')} 
          />
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>Déjà un compte?
              <span 
                onClick={onToggle} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                > Se connecter</span>
            </p>
          </div>
        </div>
      )

    return (
        <Modal
          disabled={isLoading}
          isOpen={registerModal.isOpen}
          title="S'inscrire"
          actionLabel="Continuer"
          onClose={registerModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
      );
}

export default RegisterModal;