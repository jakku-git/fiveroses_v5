"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const PlaceholdersAndVanishInput = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would normally send the form data to your backend
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence>
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <InputField
                name="name"
                label="Your Name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                isFocused={focusedField === "name"}
                required
              />
              <InputField
                name="email"
                label="Email Address"
                type="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                isFocused={focusedField === "email"}
                required
              />
              <InputField
                name="company"
                label="Company Name"
                value={formState.company}
                onChange={handleChange}
                onFocus={() => handleFocus("company")}
                onBlur={handleBlur}
                isFocused={focusedField === "company"}
                required
              />
              <div className="relative">
                <motion.label
                  htmlFor="description"
                  className={cn(
                    "absolute left-3 pointer-events-none text-neutral-400 transition-all duration-200",
                    focusedField === "description" || formState.description
                      ? "-top-2 text-xs bg-neutral-950 px-1 text-accent"
                      : "top-3",
                  )}
                >
                  Tell us about your startup
                </motion.label>
                <textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  onFocus={() => handleFocus("description")}
                  onBlur={handleBlur}
                  className="w-full p-3 bg-transparent border border-neutral-700 rounded-md focus:border-accent focus:outline-none transition-colors h-32"
                  required
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-white text-black rounded-md hover:bg-accent transition-colors"
              type="submit"
            >
              Submit Application
            </motion.button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-light mb-2">Application Submitted!</h3>
            <p className="text-neutral-300">
              Thank you for your interest in our incubator program. We'll review your application and get back to you
              soon.
            </p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-accent hover:text-white transition-colors">
              Submit another application
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface InputFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  isFocused: boolean
  type?: string
  required?: boolean
}

const InputField = ({
  name,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused,
  type = "text",
  required = false,
}: InputFieldProps) => {
  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        className={cn(
          "absolute left-3 pointer-events-none text-neutral-400 transition-all duration-200",
          isFocused || value ? "-top-2 text-xs bg-neutral-950 px-1 text-accent" : "top-3",
        )}
      >
        {label}
      </motion.label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full p-3 bg-transparent border border-neutral-700 rounded-md focus:border-accent focus:outline-none transition-colors"
        required={required}
      />
    </div>
  )
}

