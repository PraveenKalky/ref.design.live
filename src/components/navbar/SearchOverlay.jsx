import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ChevronRight, Layout, Activity, Component, Layers, Grid, Type } from 'lucide-react';
import './search-overlay.css';

/* ── Sidebar items with colored block icons ── */
const SIDEBAR_ITEMS = [
  { id: 'page-types', label: 'Page Types', icon: Layout },
  { id: 'flows', label: 'Flows', icon: Activity, badge: 'New' },
  { id: 'ux-patterns', label: 'UX Patterns', icon: Component },
  { id: 'ui-elements', label: 'UI Elements', icon: Layers },
  { id: 'categories', label: 'Categories', icon: Grid },
  { id: 'fonts', label: 'Fonts', icon: Type },
];

/* Small colored icon for sidebar */
const SidebarIcon = ({ icon: IconComponent }) => {
  if (!IconComponent) return null;
  return (
    <div className="so-sidebar-icon-wrapper">
      <IconComponent size={20} strokeWidth={2} />
    </div>
  );
};

/* ── Content for each sidebar tab ── */
const TAB_CONTENT = {
  'page-types': [
    {
      title: 'Business & Legal Pages',
      items: [
        { name: '404 Page', count: 512 }, { name: 'About', count: 440 }, { name: 'Careers', count: 441 },
        { name: 'Contacts', count: 455 }, { name: 'Developers Page', count: 277 }, { name: 'Integration Page', count: 483 },
        { name: 'Media Kit', count: 102 }, { name: 'Newsroom & Updates', count: 384 }, { name: 'Privacy Policy', count: 327 },
        { name: 'Responsibility Page', count: 77 }, { name: 'Terms & Conditions', count: 328 },
      ],
    },
    {
      title: 'Commerce',
      items: [
        { name: 'Paywall & Subscription', count: 657 }, { name: 'Product Details', count: 823 }, { name: 'Catalog Page', count: 536 },
        { name: 'Carts & Bags', count: 287 }, { name: 'Checkout', count: 687 }, { name: 'Order History', count: 125 },
        { name: 'Wallet & Balance', count: 175 },
      ],
    },
    {
      title: 'Content',
      items: [
        { name: 'Dashboard', count: 1087 }, { name: 'Content Management Page', count: 4547 }, { name: 'Discover', count: 891 },
        { name: 'Quiz & Poll', count: 835 }, { name: 'Social Feed', count: 178 }, { name: 'Task Management', count: 902 },
        { name: 'Whiteboard', count: 714 },
      ],
    },
    {
      title: 'Communication',
      items: [
        { name: 'Chat', count: 1243 }, { name: 'Email', count: 687 }, { name: 'Notifications', count: 934 },
        { name: 'Comments', count: 412 }, { name: 'Messaging', count: 756 }, { name: 'Video Call', count: 289 },
      ],
    },
    {
      title: 'User Management',
      items: [
        { name: 'Profile', count: 2134 }, { name: 'Settings', count: 1876 }, { name: 'Onboarding', count: 943 },
        { name: 'Authentication', count: 1567 }, { name: 'Permissions', count: 234 },
      ],
    },
  ],
  'flows': [
    {
      title: 'First-Time User Experience',
      items: [
        { name: 'Signing Up & Onboarding', count: 208 }, { name: 'Exploring Tutorial', count: 78 },
      ],
    },
    {
      title: 'Account',
      items: [
        { name: 'Logging In', count: 207 }, { name: 'Subscribing', count: 50 }, { name: 'Deleting Account', count: 109 },
        { name: 'Resetting Password', count: 140 }, { name: 'Canceling Subscription', count: 39 }, { name: 'Connecting & Linking', count: 20 },
      ],
    },
    {
      title: 'Commerce',
      items: [
        { name: 'Adding to Cart', count: 77 }, { name: 'Booking', count: 71 }, { name: 'Money Transferring', count: 49 },
        { name: 'Checking Out', count: 60 },
      ],
    },
    {
      title: 'Content',
      items: [
        { name: 'Adding & Creating', count: 980 }, { name: 'Editing', count: 426 }, { name: 'Personalizing & Customizing', count: 264 },
        { name: 'Media Editing', count: 122 }, { name: 'Design Editing', count: 113 }, { name: 'Uploading & Downloading', count: 335 },
        { name: 'AI Assisting', count: 291 }, { name: 'Bookmarking', count: 73 }, { name: 'Deleting', count: 428 },
        { name: 'Filtering & Sorting', count: 273 }, { name: 'Managing Tasks', count: 90 }, { name: 'Misc', count: 32 },
        { name: 'Profile Editing', count: 219 }, { name: 'Publishing & Listing', count: 29 }, { name: 'Quizzing', count: 21 },
        { name: 'Recording & Capturing', count: 47 }, { name: 'Scheduling', count: 29 }, { name: 'Searching', count: 477 },
        { name: 'Setting Up', count: 64 }, { name: 'Text Editing', count: 87 },
      ],
    },
  ],
  'ux-patterns': [
    {
      title: 'Commerce & Finance',
      items: [
        { name: 'Billing & Plans', count: 476 }, { name: 'Payment Method', count: 490 }, { name: 'Money Transfer', count: 318 },
        { name: 'Shopping', count: 1723 }, { name: 'Trial & Freemium', count: 247 },
      ],
    },
    {
      title: 'Content',
      items: [
        { name: 'Testimonials', count: 1895 }, { name: 'Stats', count: 1508 }, { name: 'Checklist & To Do', count: 480 },
        { name: 'Activity & Notification Feed', count: 508 }, { name: 'Article & Text', count: 4005 }, { name: 'Audio Player', count: 940 },
        { name: 'Event', count: 672 }, { name: 'Files', count: 899 }, { name: 'Kanban Board', count: 158 },
        { name: 'Mini Game', count: 127 }, { name: 'Mini Player', count: 218 }, { name: 'News Feed', count: 112 },
        { name: 'Playlist', count: 376 }, { name: 'Shortcuts', count: 339 }, { name: 'Size Guide', count: 96 },
        { name: 'Suggestion & Similar Items', count: 1210 }, { name: 'Templates', count: 688 }, { name: 'Trash & Archive', count: 179 },
        { name: 'Tutorial & Education', count: 1204 }, { name: 'Video Player', count: 2433 }, { name: 'Wish List & Bookmark', count: 449 },
      ],
    },
    {
      title: 'Legal & Other',
      items: [
        { name: 'Dark Mode', count: 3607 }, { name: 'Ban & Block', count: 80 }, { name: 'Booking', count: 733 },
        { name: 'Chat Bot', count: 601 }, { name: 'Drag & Drop', count: 187 }, { name: 'Draw', count: 100 },
        { name: 'FAQ', count: 1564 }, { name: 'Feedback & Survey', count: 761 }, { name: 'Food & Recipe', count: 183 },
        { name: 'Press', count: 83 }, { name: 'Save', count: 361 }, { name: 'User Menu', count: 279 },
      ],
    },
    {
      title: 'Marketing',
      items: [
        { name: 'Ads & Promo Offer', count: 761 }, { name: 'Bento Grid', count: 187 }, { name: 'Email Subscription', count: 852 },
        { name: 'Product Features', count: 1334 }, { name: 'Promo Code', count: 202 },
      ],
    },
    {
      title: 'Onboarding',
      items: [
        { name: 'Quickstart Guide', count: 440 },
      ],
    },
    {
      title: 'Page State',
      items: [
        { name: 'Filter & Sorting', count: 1737 }, { name: 'Searching', count: 2085 }, { name: 'Add & Create', count: 6412 },
        { name: 'Confirmation', count: 1340 }, { name: 'Delete', count: 1060 }, { name: 'Edit', count: 5081 },
        { name: 'Empty State', count: 3438 }, { name: 'Error', count: 1526 }, { name: 'Loading & Connecting', count: 1595 },
        { name: 'Permission', count: 66 }, { name: 'Select', count: 5621 }, { name: 'Success', count: 1454 },
        { name: 'Upload & Download', count: 1849 },
      ],
    },
    {
      title: 'Social',
      items: [
        { name: 'Reviews & Rating', count: 620 }, { name: 'Achievements & Awards', count: 328 }, { name: 'Add & Invite People', count: 893 },
        { name: 'Chat & Messages', count: 1479 }, { name: 'Comments', count: 973 }, { name: 'Flag & Report', count: 279 },
        { name: 'Followers & Following', count: 424 }, { name: 'Groups & Community', count: 373 }, { name: 'Leaderboard', count: 60 },
        { name: 'Like & Reactions', count: 464 }, { name: 'Members', count: 566 }, { name: 'Share', count: 863 },
        { name: 'Social Post', count: 484 },
      ],
    },
    {
      title: 'Utility',
      items: [
        { name: 'AI Assistant', count: 3076 }, { name: 'Audio & Video Recorder', count: 253 }, { name: 'Calendar', count: 1002 },
        { name: 'Calling', count: 268 }, { name: 'Camera & Scanner', count: 239 }, { name: 'Date & Time', count: 1298 },
        { name: 'Design Editing', count: 2338 }, { name: 'Location & Address', count: 809 }, { name: 'Media Editing', count: 947 },
        { name: 'Task', count: 1156 }, { name: 'Text Editing', count: 838 }, { name: 'Timeline & History', count: 1338 },
        { name: 'Timer & Clock', count: 178 },
      ],
    },
  ],
  'ui-elements': [
    {
      title: 'Bars',
      items: [
        { name: 'Footer', count: 13811 }, { name: 'Navigation Bar', count: 20649 }, { name: 'Sidebar & Drawer', count: 19700 },
        { name: 'Toolbar', count: 2867 },
      ],
    },
    {
      title: 'Graphics',
      items: [
        { name: 'Illustration', count: 8313 }, { name: '3d Illustration', count: 1449 }, { name: 'Animation', count: 2154 },
        { name: 'Avatar', count: 14041 }, { name: 'Gradient', count: 2975 }, { name: 'Hero Image', count: 4009 },
        { name: 'Icon', count: 44983 }, { name: 'Logo Wall', count: 1625 }, { name: 'Photo', count: 9357 },
        { name: 'Product Image', count: 5511 }, { name: 'Sticker', count: 155 }, { name: 'Thumbnail', count: 6439 },
      ],
    },
    {
      title: 'Helper Elements',
      items: [
        { name: 'Skeleton', count: 138 }, { name: 'Badge', count: 4458 }, { name: 'Breadcrumb', count: 2460 },
        { name: 'Currency', count: 4445 }, { name: 'Map Pin', count: 511 }, { name: 'Progress Bar', count: 3038 },
        { name: 'QR Code', count: 296 }, { name: 'Step Indicator', count: 2480 }, { name: 'Stepper', count: 815 },
        { name: 'Tags & Chips', count: 2070 },
      ],
    },
    {
      title: 'Input Controls',
      items: [
        { name: 'Color Picker', count: 1082 }, { name: 'Tabs', count: 12419 }, { name: 'Button', count: 56833 },
        { name: 'Checkbox & Radio', count: 6838 }, { name: 'Date & Time Picker', count: 573 }, { name: 'Dropdown', count: 22986 },
        { name: 'Floating Button', count: 4848 }, { name: 'Page Control & Pagination', count: 4196 }, { name: 'Search Field', count: 12692 },
        { name: 'Slider', count: 1953 }, { name: 'Switch & Toggle', count: 5101 }, { name: 'Text Field', count: 19731 },
      ],
    },
    {
      title: 'Layout',
      items: [
        { name: 'Cards & Tiles', count: 13261 }, { name: 'Map', count: 926 }, { name: 'Table', count: 1673 },
        { name: 'Line & Bar Chart', count: 836 }, { name: 'Accordion & Collapse', count: 6428 }, { name: 'Carousel', count: 2168 },
        { name: 'Code Snippet', count: 460 }, { name: 'List', count: 11405 }, { name: 'Media Gallery', count: 805 },
        { name: 'Nodes', count: 385 }, { name: 'Pie & Donut Chart', count: 123 }, { name: 'Tree View', count: 439 },
      ],
    },
    {
      title: 'Overlay',
      items: [
        { name: 'Dialog & Modal Window', count: 12942 }, { name: 'Action Sheet', count: 1022 }, { name: 'Dropdown Menu', count: 3901 },
        { name: 'Full-Screen Overlay', count: 2212 }, { name: 'Mega Menu', count: 196 }, { name: 'Notifications & Toast', count: 1992 },
        { name: 'Overlay Window', count: 1021 }, { name: 'Popover', count: 15732 }, { name: 'Side Sheet', count: 5645 },
        { name: 'Tooltip', count: 1088 },
      ],
    },
  ],
  'categories': [
    {
      title: '', // Flat list, no title
      items: [
        { name: 'AI Tool', count: 9316 }, { name: 'Books', count: 465 }, { name: 'Business', count: 18306 },
        { name: 'Collaboration Tools', count: 12704 }, { name: 'Communication Tools', count: 6581 }, { name: 'Design & Media Editing', count: 8971 },
        { name: 'Development Tools', count: 5830 }, { name: 'Education', count: 1565 }, { name: 'Electronic & Devices', count: 523 },
        { name: 'Entertainment', count: 4792 }, { name: 'Finance', count: 4730 }, { name: 'Fitness', count: 358 },
        { name: 'Food & Drink', count: 1201 }, { name: 'Food Delivery', count: 830 }, { name: 'Fundraising', count: 616 },
        { name: 'Health & Wellness', count: 1261 }, { name: 'Home & Decor', count: 747 }, { name: 'Inspiration Board', count: 1062 },
        { name: 'Job Search', count: 1809 }, { name: 'Kids', count: 150 }, { name: 'Lifestyle', count: 145 },
        { name: 'Magazines & Newspapers', count: 906 }, { name: 'Map & Navigation', count: 1100 }, { name: 'Marketplace', count: 5784 },
        { name: 'Music Streaming', count: 1691 }, { name: 'News', count: 825 }, { name: 'Paperwork', count: 2081 },
        { name: 'Photo Stock', count: 301 }, { name: 'Productivity', count: 21257 }, { name: 'Project Management', count: 4380 },
        { name: 'Real Estate', count: 804 }, { name: 'Reference', count: 1440 }, { name: 'Scheduling Tools', count: 4643 },
        { name: 'Social Networking', count: 5374 }, { name: 'Sports', count: 505 }, { name: 'Transport', count: 550 },
        { name: 'Travel & Booking', count: 2032 }, { name: 'Video Streaming', count: 1762 }, { name: 'Weather', count: 217 },
        { name: 'Web3 & Crypto', count: 1823 },
      ],
    },
  ],
  'fonts': [
    {
      title: '', // Flat list, no title
      items: [
        { name: 'ABC Oracle', count: 212 }, { name: 'AdiHaus', count: 139 }, { name: 'Adihaus Din', count: 128 },
        { name: 'Adineue Pro', count: 137 }, { name: 'Adobe Caslon', count: 175 }, { name: 'Aeonik', count: 127 },
        { name: 'Aimé', count: 63 }, { name: 'Aktiv Grotesk', count: 472 }, { name: 'Apercu', count: 176 },
        { name: 'Apercu Pro', count: 130 }, { name: 'Arial', count: 4351 }, { name: 'Atlas Grotesk', count: 115 },
        { name: 'Avenir', count: 136 }, { name: 'Avenir Next', count: 266 }, { name: 'Avenir Roman', count: 107 },
        { name: 'Averta', count: 280 }, { name: 'Averta Standard', count: 104 }, { name: 'Basier Circle', count: 70 },
        { name: 'Berkeley Mono', count: 114 }, { name: 'Cadiz', count: 54 }, { name: 'Cal', count: 107 },
        { name: 'Calibre', count: 68 }, { name: 'Capsule', count: 98 }, { name: 'Cera Pro', count: 216 },
        { name: 'Chronicle Deck', count: 59 }, { name: 'Circular', count: 284 }, { name: 'Circular Std', count: 52 },
        { name: 'DIN Next Rounded', count: 148 }, { name: 'DM Sans', count: 107 }, { name: 'Euclid Circular A', count: 52 },
        { name: 'Favorit', count: 110 }, { name: 'FK Grotesk', count: 120 }, { name: 'FK Grotesk Neue', count: 122 },
        { name: 'Formular', count: 241 }, { name: 'Futura PT', count: 195 }, { name: 'Garnett', count: 112 },
        { name: 'Georgia', count: 75 }, { name: 'Gotham', count: 57 }, { name: 'Graphik', count: 1269 },
        { name: 'Graphik', count: 51 }, { name: 'Grotesk', count: 153 }, { name: 'GT America', count: 412 },
        { name: 'GT Eesti', count: 138 }, { name: 'GT Eesti', count: 69 }, { name: 'GT Eesti', count: 80 },
        { name: 'GT Eesti', count: 115 }, { name: 'GT Super', count: 90 }, { name: 'GT Walsheim', count: 327 },
        { name: 'GT Walsheim Pro', count: 112 }, { name: 'Helvetica', count: 569 }, { name: 'Helvetica Neue', count: 1722 },
        { name: 'Hurme Geometric Sans', count: 155 }, { name: 'IBM Plex Sans', count: 85 }, { name: 'Inter', count: 4857 },
        { name: 'Iskry', count: 82 }, { name: 'Karla', count: 60 }, { name: 'Karla', count: 114 },
        { name: 'Lato', count: 237 }, { name: 'Lucida Grande', count: 634 }, { name: 'Madefor', count: 418 },
        { name: 'Maison Neue', count: 80 }, { name: 'Manrope', count: 177 }, { name: 'Mark Pro', count: 83 },
        { name: 'Maven Pro', count: 91 }, { name: 'Means', count: 383 }, { name: 'Menlo', count: 64 },
        { name: 'Merriweather', count: 81 }, { name: 'Montserrat', count: 125 }, { name: 'Nekst', count: 169 },
        { name: 'Neue Haas Grotesk', count: 145 }, { name: 'Neue Haas Unica', count: 84 }, { name: 'Neutraface New Yorker', count: 70 },
        { name: 'Noto Sans', count: 262 }, { name: 'Nunito', count: 116 }, { name: 'NY Irvin', count: 133 },
        { name: 'NYT Cheltenham', count: 103 }, { name: 'NYT Franklin', count: 119 }, { name: 'Open Sans', count: 929 },
        { name: 'PF Square Sans Pro', count: 422 }, { name: 'Pitch Lato UI', count: 93 }, { name: 'Plus Jakarta Sans', count: 51 },
        { name: 'Poppins', count: 845 }, { name: 'Proxima Nova', count: 854 }, { name: 'Roboto', count: 767 },
        { name: 'Roboto Mono', count: 110 }, { name: 'Roobert', count: 108 }, { name: 'San Francisco', count: 4783 },
        { name: 'Sanomat', count: 109 }, { name: 'Sanomat', count: 138 }, { name: 'Segoe UI', count: 57 },
        { name: 'SF Mono', count: 165 }, { name: 'SF Pro', count: 123 }, { name: 'Sharp Grotesk', count: 99 },
        { name: 'Sharp Sans', count: 214 }, { name: 'Silka', count: 58 }, { name: 'Skiff Mono', count: 181 },
        { name: 'Skiff Sans', count: 207 }, { name: 'SoDo Sans', count: 148 }, { name: 'Sofia', count: 86 },
        { name: 'Sofia Pro', count: 126 }, { name: 'Sohne', count: 254 }, { name: 'Söhne', count: 119 },
      ],
    },
  ],
};

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('web');
  const [activeSidebar, setActiveSidebar] = useState('page-types');
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('search-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('search-open');
    }
    return () => { 
      document.body.style.overflow = '';
      document.body.classList.remove('search-open');
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="so-backdrop" ref={overlayRef} onClick={handleBackdropClick}>
      <div className="so-container">

        <div className="so-topbar">
          <div className="so-topbar-left">
            <Search size={22} strokeWidth={2.5} className="so-topbar-icon" />
            <input
              ref={inputRef}
              type="text"
              className="so-topbar-input"
              placeholder="Search Web Products, Screens, UI Elements, Flows"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="so-topbar-right">
            <button className="so-close" onClick={onClose} title="Close"><X size={28} /></button>
          </div>
        </div>

        <div className="so-body">
          <aside className="so-sidebar">
            <nav className="so-sidebar-nav">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`so-sb-item ${activeSidebar === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSidebar(item.id)}
                >
                  <SidebarIcon icon={item.icon} />
                  <span className="so-sb-label">{item.label}</span>
                  {item.badge && <span className="so-sb-badge">{item.badge}</span>}
                  <ChevronRight size={16} className="so-sb-arrow" />
                </button>
              ))}
            </nav>
            <div className="so-sb-card">
              <div className="so-sb-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 15L15 12L10 9V15Z" fill="#FF4D4D"/>
                  <rect x="2" y="4" width="20" height="16" rx="4" stroke="#FF4D4D" strokeWidth="2"/>
                </svg>
              </div>
              <span className="so-sb-card-text">Learn How to Search<br/>Better and Faster</span>
            </div>
          </aside>

          <main className="so-main">
            <div className="so-main-scroll">
              {TAB_CONTENT[activeSidebar] ? (
                TAB_CONTENT[activeSidebar].map((section, idx) => (
                  <div key={section.title || idx} className="so-section">
                    {section.title && <h3 className="so-section-title">{section.title}</h3>}
                    <div className="so-grid">
                      {section.items.map((item) => (
                        <a key={item.name} href="#" className="so-grid-item" onClick={(e) => e.preventDefault()}>
                          <span className="so-item-name">{item.name}</span>
                          <span className="so-item-count">{item.count.toLocaleString()}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="so-placeholder">
                  <h3 className="so-section-title">Coming soon</h3>
                  <p className="so-hint">We're currently curating the best {activeSidebar.replace('-', ' ')} for you.</p>
                </div>
              )}
            </div>
          </main>
        </div>

        <div className="so-bottombar">
          <div className="so-shortcut">
            <kbd>Tab</kbd> <kbd>Tab + Shift</kbd>
            <span className="so-hint">Switch Tabs</span>
          </div>
          <div className="so-shortcut">
            <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd>
            <span className="so-hint">Navigate</span>
          </div>
          <div className="so-shortcut">
            <kbd>Enter</kbd>
            <span className="so-hint">Select</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchOverlay;
