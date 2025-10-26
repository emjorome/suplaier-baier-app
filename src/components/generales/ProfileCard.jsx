// src/components/generales/ProfileCard.jsx (El archivo que acabas de crear)

import React, { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext'; // Asegúrate que esta ruta sea correcta

// 1. Recibe la prop "onClose" que le pasamos desde NavbarComp
const ProfileCard = ({ onClose }) => {
    
    // 2. Obtén el usuario del contexto (AuthProvider expone `authState`, que contiene `user`)
    const { authState } = useContext(AuthContext);
    const user = authState?.user;

    // 3. Función para COPIAR (esto es parte de la lógica del código de referido)
    const handleCopy = () => {
        if (!user?.codigo_invitacion) return;
        navigator.clipboard.writeText(user?.codigo_invitacion)
            .then(() => alert("¡Código copiado!"))
            .catch(err => console.error('Error al copiar:', err));
    };

    // 4. Función para COMPARTIR (la forma fácil)
    const handleShare = async () => {
        if (!navigator.share) {
            alert("Tu navegador no soporta esta función.");
            return;
        }
        try {
            await navigator.share({
                title: 'Únete a Suplaier',
                text: `Usa mi código para unirte a Suplaier: ${user?.codigo_invitacion}`,
                url: window.location.origin
            });
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    };

    return (
        // Un "backdrop" (fondo oscuro) que al hacer clic llama a la función onClose
        <div className="modal-backdrop" onClick={onClose}>
            
            {/* Este es el modal en sí. Detenemos la propagación del clic
                para que al hacer clic DENTRO del modal, no se cierre. */}
            <div className="profile-card-modal" onClick={(e) => e.stopPropagation()}> 
                
                {/* Un botón 'X' para cerrar */}
                <button className="modal-close-button" onClick={onClose}>X</button>
                
                {/* Aquí va el contenido de tu imagen */}
                <img src={user?.UrlLogoEmpresa || 'user_icon.png'} alt="Foto de perfil" className="perfil-foto" />
                
                <h3>{user?.Nombre}</h3> {/* Asumo que tienes estos datos en 'user' */}

                {/* --- Sección del Código de Referido --- */}
                <div className="codigo-referido-box">
                    <span 
                        className="material-symbols-rounded" 
                        onClick={handleCopy} 
                        style={{cursor: 'pointer'}}
                    >
                        content_copy {/* Icono de copiar */}
                    </span>
                    
                    {/* Aquí mostramos el código que vendrá del Backend */}
                    <span>{user?.codigo_invitacion|| "..."}</span> 
                    
                    <span 
                        className="material-symbols-rounded" 
                        onClick={handleShare} 
                        style={{cursor: 'pointer'}}
                    >
                        share {/* Icono de compartir */}
                    </span>
                </div>
                {/* --- Fin de la sección --- */}

                <p>Tel: {user?.Numero}</p>
                <p>Email: {user?.Email}</p>
                <p>País: {user?.Pais}</p>
                <p>Ciudad: {user?.Ciudad}</p>
                <p>Dirección: {user?.Direccion}</p>
                {/* ... resto de tu información ... */}
            </div>
        </div>
    );
};

export default ProfileCard;