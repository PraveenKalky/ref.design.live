import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

const NavbarSearch = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    /* Cmd+K / Ctrl+K shortcut to open */
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOverlayOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="rd-navbar-search" onClick={() => setIsOverlayOpen(true)}>
                <Search className="rd-search-icon" size={18} />
            </div>

            <SearchOverlay 
                isOpen={isOverlayOpen} 
                onClose={() => setIsOverlayOpen(false)} 
            />
        </>
    );
};

export default NavbarSearch;
