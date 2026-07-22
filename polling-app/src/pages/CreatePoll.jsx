import { useState } from "react"
import { useNavigate } from "react-router"

import Navbar from "../components/Navbar"

//react function to create poll
function CreatePoll() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [options, setOptions] = useState(["", ""])
    const [formError, setFormError] = useState("")

    //how react sees and inputs options
    function handleOptionChange(index, value) {
        const newOptions = [...options]
        newOptions[index] = value
        setOptions(newOptions)
    }

    //adding boxes until it hits maximum of 5 boxes 
    function addOption() {
        if (options.length < 5) {
            setOptions([...options, ""])
        }
    }

    //submit button
    async function handleSubmit(e) {
        e.preventDefault()

        const trimmedTitle = title.trim()
        const nonEmptyOptions = options.filter((o) => o.trim() !== "")

        if (!trimmedTitle) {
            setFormError("Title is required.")
            return
        }
        if (nonEmptyOptions.length < 2) {
            setFormError("Please provide at least 2 options.")
            return
        }
        setFormError("")

        try {
            const response = await fetch("/polls", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, options: nonEmptyOptions }),
            })

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`)
            }

            navigate("/")
        } catch (err) {
            console.error("Failed to create poll:", err)
            setFormError("Failed to create poll. Please try again.")
        }
    }

    return (
        <div className="app">
            <Navbar />
            <h1>Create a Poll</h1>

            <section className="card">
                <form className="poll-form" onSubmit={handleSubmit}>
                    {formError && <p className="error">{formError}</p>}

                    <input
                        type="text"
                        className="poll-title-input"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        className="poll-description-input"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <ul className="option-list">
                        {options.map((option, i) => (
                            <li className="option-item" key={i}>
                                <input
                                    type="text"
                                    placeholder={"Option " + (i + 1)}
                                    value={option}
                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                />
                            </li>
                        ))}
                    </ul>

                    <button type="button" className="add-option-btn" onClick={addOption}>
                        Add Option
                    </button>

                    <button type="submit" className="submit-btn">
                        Create Poll
                    </button>
                </form>
            </section>
        </div>
    )
}

export default CreatePoll