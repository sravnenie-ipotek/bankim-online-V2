'use client'

import React from 'react'
import { useFormikContext } from 'formik'
import { useContentApi } from '@hooks/useContentApi'

const SingleButton: React.FC = () => {
  const { getContent } = useContentApi('global_components')
  const { isValid, handleSubmit, values, setFieldTouched } = useFormikContext<Record<string, unknown>>()

  const handleClick = () => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true, false)
    })

    if (isValid) {
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col items-end w-full py-8 pb-10 border-t border-[rgb(51,53,53)] mx-auto mt-10 max-[1200px]:p-0">
      <div className="mx-auto w-[70.5rem] flex items-end justify-end max-[1200px]:mx-5 max-[1200px]:my-8 max-[890px]:items-center max-[890px]:justify-center max-[890px]:w-full max-[890px]:m-0 max-[890px]:bg-base-secondary max-[890px]:p-6 max-[890px]:pb-[calc(1.5rem+env(safe-area-inset-bottom,0))] max-[890px]:fixed max-[890px]:bottom-0 max-[890px]:left-0 max-[890px]:right-0 max-[890px]:z-[999] max-[890px]:shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex gap-8 w-[15.5625rem] max-[890px]:flex-col max-[890px]:w-full">
          <button
            type="button"
            onClick={handleClick}
            className="w-full h-[3.5rem] rounded bg-accent-primary text-[#161616] text-[1rem] font-semibold cursor-pointer transition-opacity hover:opacity-90"
            style={{
              opacity: isValid ? 1 : 0.7,
              cursor: isValid ? 'pointer' : 'not-allowed',
            }}
          >
            {getContent('button_next')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleButton
