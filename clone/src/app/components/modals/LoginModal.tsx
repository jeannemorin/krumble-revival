'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
    const router = useRouter();
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
          email: '',
          password: ''
        },
      });

      const onSubmit: SubmitHandler<FieldValues> = 
        (data) => {
          setIsLoading(true);

          signIn('credentials', { 
            ...data, 
            redirect: false,
        })
        .then((callback) => {
          setIsLoading(false);

          if (callback?.ok) {
            toast.success('Logged in');
            router.refresh();
            loginModal.onClose();
          }
          
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Bienvenue sur KampusView"
            subtitle="Se connecter à son compte"
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
            id="password"
            label="Mot de passe"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    
      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button 
            outline 
            label="Se connecter avec Google"
            icon={FcGoogle}
            onClick={() => {}} //signIn('google')} 
          />
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>Pas encore de compte?
              <span 
                //onClick={onToggle} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                // eslint-disable-next-line react/no-unescaped-entities
                > S'inscrire</span>
            </p>
          </div>
        </div>
      )

    return (
        <Modal
          disabled={isLoading}
          isOpen={loginModal.isOpen}
          title="Se connecter"
          actionLabel="Continuer"
          onClose={loginModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
      );
}

export default LoginModal;