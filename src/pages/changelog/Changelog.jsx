import React from 'react';
import './Changelog.css';

const changelogData = [
  {
    version: '1.4.0',
    date: 'Tuesday, July 23, 2024',
    description: 'Performance and accessibility improvements focused on delivering a faster and more inclusive experience.',
    groups: [
      {
        type: 'New',
        title: 'Features',
        badgeClass: 'new',
        items: ['Introduced automated accessibility contrast checker.']
      },
      {
        type: 'Improvement',
        title: 'Enhancements',
        badgeClass: 'improvement',
        items: [
          'Improved component rendering speeds across the board.',
          'Enhanced contrast ratios for accessibility compliance.'
        ]
      },
      {
        type: 'Fix',
        title: 'Bug Fixes',
        badgeClass: 'fix',
        items: ['Fixed minor layout bugs on mobile devices.']
      }
    ]
  },
  {
    version: '1.3.0',
    date: 'Monday, July 15, 2024',
    description: 'Improved Fonts experience to give you more typographic flexibility.',
    groups: [
      {
        type: 'New',
        title: 'Features',
        badgeClass: 'new',
        items: ['Added PolySans Trial integration for premium typography testing.']
      },
      {
        type: 'Improvement',
        title: 'Enhancements',
        badgeClass: 'improvement',
        items: ['Refactored font loading strategy to reduce layout shift.']
      }
    ]
  },
  {
    version: '1.2.0',
    date: 'Wednesday, July 10, 2024',
    description: 'Added Websites gallery to showcase the best web design inspiration.',
    groups: [
      {
        type: 'New',
        title: 'Features',
        badgeClass: 'new',
        items: ['New grid layout designed specifically for website inspiration.']
      },
      {
        type: 'Improvement',
        title: 'Enhancements',
        badgeClass: 'improvement',
        items: ['Hover micro-interactions updated for a smoother feel.']
      }
    ]
  },
  {
    version: '1.1.0',
    date: 'Friday, July 5, 2024',
    description: 'Added UI/UX Tastes.',
    groups: [
      {
        type: 'Improvement',
        title: 'Enhancements',
        badgeClass: 'improvement',
        items: [
          'Refined shadow tokens for depth.',
          'Added new border radius utilities for more pill shapes.'
        ]
      }
    ]
  },
  {
    version: '1.0.0',
    date: 'Monday, July 1, 2024',
    description: 'Initial release of the design vault.',
    groups: [
      {
        type: 'Release',
        title: 'Initial Setup',
        badgeClass: 'new',
        items: [
          'Core design system setup and token architecture.',
          'Basic component library built out.'
        ]
      }
    ]
  }
];

const Changelog = () => {
  return (
    <div className="changelog-page">
      <div className="changelog-container">
        <div className="changelog-header">
          <h1>Release Notes</h1>
          <p className="changelog-subtitle">Detailed history of updates, improvements, and new features added to the design system over time.</p>
        </div>

        <div className="changelog-list">
          {changelogData.map((entry, index) => (
            <div className="changelog-entry" key={index}>
              <div className="entry-left">
                <div className="version-title">{entry.version}</div>
                <div className="date">{entry.date}</div>
              </div>
              
              <div className="entry-right">
                <div className="entry-description">{entry.description}</div>
                
                {entry.groups.map((group, gIndex) => (
                  <div className="change-group" key={gIndex}>
                    <div className="group-title">
                      {group.title}
                      <span className={`badge ${group.badgeClass}`}>{group.type}</span> 
                    </div>
                    <ul className="change-list">
                      {group.items.map((item, iIndex) => (
                        <li key={iIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Changelog;
