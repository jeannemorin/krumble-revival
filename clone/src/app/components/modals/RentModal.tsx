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
//import Counter from "../inputs/Counter";
//import CountrySelect from "../inputs/CountrySelect";
import { categories } from '../navbar/Categories';
//import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
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
          location: 'Croatia',
          guestCount: 1,
          roomCount: 1,
          bathroomCount: 1,
          imageSrc: '',
          price: 1,
          title: '',
          description: '',
        }
      });

    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
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
        if (step === STEPS.PRICE) {
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
    
      //STEP 2
      if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
                title="Où se situe ton campus ?"
                subtitle="Aide nous à te trouver!"
            />

          
          </div>
        );
      }
      
      //STEP 3
      if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basics about your place"
              subtitle="What amenitis do you have?"
            />
            <Counter 
              onChange={(value) => setCustomValue('guestCount', value)}
              value={guestCount}
              title="Guests" 
              subtitle="How many guests do you allow?"
            />
            <hr />
            <Counter 
              onChange={(value) => setCustomValue('roomCount', value)}
              value={roomCount}
              title="Rooms" 
              subtitle="How many rooms do you have?"
            />
            <hr />
            <Counter 
              onChange={(value) => setCustomValue('bathroomCount', value)}
              value={bathroomCount}
              title="Bathrooms" 
              subtitle="How many bathrooms do you have?"
            />
          </div>
        )
      }

      if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Ajoute une photo de couverture pour ton asso"
              subtitle="Montre aux entreprises qui vous êtes!"
            />
            <ImageUpload
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={imageSrc}
            />
          </div>
        )
      }

      if (step === STEPS.DESCRIPTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="How would you describe your place?"
              subtitle="Short and sweet works best!"
            />
            <Input
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }
    
      if (step === STEPS.PRICE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Now, set your price"
              subtitle="How much do you charge per night?"
            />
            <Input
              id="price"
              label="Price"
              formatPrice 
              type="number" 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
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