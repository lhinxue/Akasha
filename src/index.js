import React, { StrictMode } from 'react'
import Akasha from './app/Akasha'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('Akasha'))
    .render(
        <StrictMode>
            <Akasha />
        </StrictMode>
    )

