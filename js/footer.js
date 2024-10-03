document.addEventListener('DOMContentLoaded', () => {
    fetch('footerData.json')
      .then(response => response.json())
      .then(footerData => {
        const footerContainer = document.querySelector('.footer-container');
  
        if (!footerContainer) {
          console.error('Footer container not found!');
          return;
        }
  
        // Creating footer-sections
        const footerSectionsDiv = document.createElement('div');
        footerSectionsDiv.className = 'footer-sections';
  
        footerData.sections.forEach(section => {
          const columnDiv = document.createElement('div');
          columnDiv.className = 'footer-column';
  
          const sectionDiv = document.createElement('div');
          sectionDiv.className = 'footer-section';
  
          const titleDiv = document.createElement('div');
          titleDiv.className = 'footer-title';
          titleDiv.textContent = section.title;
  
          sectionDiv.appendChild(titleDiv);
  
          section.links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.className = 'footer-link';
            anchor.textContent = link.text;
            sectionDiv.appendChild(anchor);
          });
  
          columnDiv.appendChild(sectionDiv);
          footerSectionsDiv.appendChild(columnDiv);
        });
  
        // Creating Mail Us and Registered Office sections
        const addressColumn = document.createElement('div');
        addressColumn.className = 'footer-column footer-column-address';
        
        // Mail Us section
        const mailUsSection = document.createElement('div');
        mailUsSection.className = 'footer-address-section';
        const mailUsTitle = document.createElement('div');
        mailUsTitle.className = 'footer-title';
        mailUsTitle.textContent = 'Mail Us:';
        const mailAddressContent = document.createElement('div');
        mailAddressContent.className = 'address-content';
  
        footerData.address.mailUs.forEach(line => {
          const p = document.createElement('p');
          p.textContent = line;
          mailAddressContent.appendChild(p);
        });
  
        mailUsSection.appendChild(mailUsTitle);
        mailUsSection.appendChild(mailAddressContent);
  
        // Social Icons
        const socialDiv = document.createElement('div');
        socialDiv.className = 'social-icons';
        footerData.social.forEach(social => {
          const socialLink = document.createElement('a');
          socialLink.href = social.href;
          const img = document.createElement('img');
          img.src = social.icon;
          img.alt = social.alt;
          socialLink.appendChild(img);
          socialDiv.appendChild(socialLink);
        });
        mailUsSection.appendChild(socialDiv);
        addressColumn.appendChild(mailUsSection);
  
        // Registered Office section
        const registeredOfficeSection = document.createElement('div');
        registeredOfficeSection.className = 'footer-registered-office';
        const registeredOfficeTitle = document.createElement('div');
        registeredOfficeTitle.className = 'footer-title';
        registeredOfficeTitle.textContent = 'Registered Office Address:';
        const registeredOfficeContent = document.createElement('div');
        registeredOfficeContent.className = 'address-content';
  
        footerData.address.registeredOffice.forEach(line => {
          const p = document.createElement('p');
          p.textContent = line;
          registeredOfficeContent.appendChild(p);
        });
  
        registeredOfficeSection.appendChild(registeredOfficeTitle);
        registeredOfficeSection.appendChild(registeredOfficeContent);
        addressColumn.appendChild(registeredOfficeSection);
  
        footerSectionsDiv.appendChild(addressColumn);
        footerContainer.appendChild(footerSectionsDiv);
  
        // Creating footer-extras
        const footerExtras = document.createElement('div');
        footerExtras.className = 'footer-extras';
  
        const footerExtraLinks = document.createElement('div');
        footerExtraLinks.className = 'footer-extra-links';
  
        footerData.extras.links.forEach(extra => {
          const extraDiv = document.createElement('div');
          const extraImg = document.createElement('img');
          extraImg.src = extra.icon;
          extraImg.alt = extra.alt;
  
          const extraAnchor = document.createElement('a');
          extraAnchor.href = extra.href;
  
          const extraSpan = document.createElement('span');
          extraSpan.className = 'footer-extra-text';
          extraSpan.textContent = extra.text;
  
          extraAnchor.appendChild(extraSpan);
          extraDiv.appendChild(extraImg);
          extraDiv.appendChild(extraAnchor);
          footerExtraLinks.appendChild(extraDiv);
        });
  
        footerExtras.appendChild(footerExtraLinks);
  
        const copyrightSpan = document.createElement('span');
        copyrightSpan.className = 'footer-copyright';
        copyrightSpan.textContent = footerData.extras.copyright;
  
        footerExtras.appendChild(copyrightSpan);
  
        const footerImg = document.createElement('img');
        footerImg.src = footerData.extras.footerLogo;
        footerImg.alt = 'Flipkart';
  
        footerExtras.appendChild(footerImg);
  
        // Appending footer-extras to footer-container
        footerContainer.appendChild(footerExtras);
      })
      .catch(error => console.error('Error fetching footer data:', error));
  });
  