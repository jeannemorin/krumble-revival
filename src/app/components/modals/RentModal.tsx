'use client'

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";
import { categories } from '../navbar/Categories';
import Input from '../inputs/Input';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import ImageUpload from '../inputs/ImageUpload';
import BigInput from '../inputs/BigInput';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  DESCRIPTION = 2,
  IMAGES = 3,
  INFO = 4,
  CONTACT = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

    const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          category: '',
          imageSrc: '',
          title: '',
          description: '',
          subtitle: '',
          school: '',
          campusLocation: '',
          emailContact: '',
          phoneContact: '',
          partnershipDescription: ''
        }
      });

    const category = watch('category');
    const imageSrc = watch('imageSrc');


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.CONTACT) {
          return onNext();
        }
        
        setIsLoading(true);
    
        axios.post('/api/listings', data)
        .then(() => {
          toast.success('Listing created!');
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY)
          rentModal.onClose();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
    
    
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })

    }


    //GO BACK TO THE PRECEDENT PAGE
    const onBack = () => {
        setStep((value) => value - 1);
    }
    
    //GOT TO THE NEXT SLIDE
    const onNext = () => {
        setStep((value) => value + 1);
    }

    //ACTION WRITTEN ON RIGHT BUTTON
    const actionLabel = useMemo(() => {
        if (step === STEPS.CONTACT) {
          return 'Create'
        }
    
        return 'Next'
    }, [step]);

    //ACTION WRITTEN ON LEFT BUTTON
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
          return undefined
        }
    
        return 'Back'
    }, [step]);

    //STEP 0 CHOOSE A CATEGORY
    let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Qu'est ce qui décris le mieux ton asso ?"
            subtitle="Choisi une catégorie"
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => 
                    setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      )
    
      //STEP 1 : LOCATION OF YOUR CAMPUS
      if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
                title="Où se situe ton campus ?"
                subtitle="Aide nous à te trouver!"
            />

            <Input
              id="school"
              label="Ton école"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="campusLocation"
              label="Ville"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          
          </div>
        );
      }
      
      //STEP 2 : DESCRIPTION OF THE STUDENT CLUB
      if (step === STEPS.DESCRIPTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Dis-nous en un peu plus sur l'asso"
              subtitle="Ravis de faire ta connaissance"
            />
            <Input
              id="title"
              label="Nom de l'asso"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="subtitle"
              label="En quelques mots..."
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <BigInput
              id="description"
              label="Description de l'asso"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              rows={10}
              maxLength={400}
            />
          </div>
        )
      }

      
      //STEP 3 : CHOOSE A PROFIL PIC
      if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Ajoute une photo de profil pour ton asso"
              subtitle=""
            />
            <ImageUpload
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={imageSrc}
            />
          </div>
        )
      }


      //STEP 4 : PARTNERSHIP INFO
      if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Quel partenariat tu recherches ?"
              subtitle="Pourquoi doit-on vous aider ?"
            />
            <BigInput
              id="partnershipDescription"
              label="Dis-nous tout..."
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              rows={10}
              maxLength={600}
            />
          </div>
        )
      }
      
      //STEP 5 : CONTACT
      if (step === STEPS.CONTACT) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Maintenant, le contact de l'association"
              subtitle="Comment on peut vous contacter ?"
            />
            <Input
              id="emailContact"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="phoneContact"
              label="Téléphone"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          </div>
        )
      }


    return (
        <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step=== STEPS.CATEGORY ? undefined : onBack}
        title="Inscris ton asso"
        body={bodyContent}/>
    )
}

export default RentModal;