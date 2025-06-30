export default {
  editor: {
    label: {
      en: 'Sheet',
      fr: 'Panneau Latéral'
    },
    icon: 'sidebar'
  },
  triggerEvents: [
    {
      name: 'action-click',
      label: { en: 'On action click', fr: 'Au clic sur action' },
      event: {
        action: {},
        formData: {},
        fields: []
      }
    },
    {
      name: 'update:open',
      label: { en: 'On open change', fr: 'Au changement d\'ouverture' },
      event: {
        open: false
      }
    },
    {
      name: 'close',
      label: { en: 'On close', fr: 'À la fermeture' },
      event: {}
    }
  ],
  properties: {
    side: {
      label: { en: 'Side', fr: 'Côté' },
      type: 'TextSelect',
      options: {
        options: [
          { value: 'top', label: { en: 'Top', fr: 'Haut' } },
          { value: 'right', label: { en: 'Right', fr: 'Droite' } },
          { value: 'bottom', label: { en: 'Bottom', fr: 'Bas' } },
          { value: 'left', label: { en: 'Left', fr: 'Gauche' } }
        ]
      },
      defaultValue: 'right',
      bindable: true
    },
    title: {
      label: { en: 'Title', fr: 'Titre' },
      type: 'Text',
      bindable: true
    },
    description: {
      label: { en: 'Description', fr: 'Description' },
      type: 'Text',
      bindable: true
    },
    content: {
      label: { en: 'Custom content', fr: 'Contenu personnalisé' },
      type: 'LongText',
      bindable: true
    },
    showHeader: {
      label: { en: 'Show header', fr: 'Afficher l\'en-tête' },
      type: 'OnOff',
      defaultValue: true,
      bindable: true
    },
    showClose: {
      label: { en: 'Show close button', fr: 'Afficher le bouton fermer' },
      type: 'OnOff',
      defaultValue: true,
      bindable: true
    },
    showFooter: {
      label: { en: 'Show footer', fr: 'Afficher le pied de page' },
      type: 'OnOff',
      defaultValue: true,
      bindable: true
    },
    closeOnBackdrop: {
      label: { en: 'Close on backdrop click', fr: 'Fermer au clic sur l\'arrière-plan' },
      type: 'OnOff',
      defaultValue: true,
      bindable: true
    },
    closeOnEscape: {
      label: { en: 'Close on escape', fr: 'Fermer avec Échap' },
      type: 'OnOff',
      defaultValue: true,
      bindable: true
    },
    closeLabel: {
      label: { en: 'Close button label', fr: 'Label du bouton fermer' },
      type: 'Text',
      defaultValue: 'Close',
      bindable: true
    },
    fields: {
      label: { en: 'Form fields', fr: 'Champs de formulaire' },
      type: 'Array',
      options: {
        item: {
          type: 'Object',
          options: {
            item: {
              id: {
                label: { en: 'Field ID', fr: 'ID du champ' },
                type: 'Text',
                bindable: true
              },
              type: {
                label: { en: 'Field type', fr: 'Type de champ' },
                type: 'TextSelect',
                options: {
                  options: [
                    { value: 'text', label: { en: 'Text', fr: 'Texte' } },
                    { value: 'email', label: { en: 'Email', fr: 'Email' } },
                    { value: 'password', label: { en: 'Password', fr: 'Mot de passe' } },
                    { value: 'textarea', label: { en: 'Textarea', fr: 'Zone de texte' } },
                    { value: 'select', label: { en: 'Select', fr: 'Sélection' } },
                    { value: 'checkbox', label: { en: 'Checkbox', fr: 'Case à cocher' } }
                  ]
                },
                defaultValue: 'text',
                bindable: true
              },
              label: {
                label: { en: 'Label', fr: 'Libellé' },
                type: 'Text',
                bindable: true
              },
              placeholder: {
                label: { en: 'Placeholder', fr: 'Placeholder' },
                type: 'Text',
                bindable: true
              },
              value: {
                label: { en: 'Value', fr: 'Valeur' },
                type: 'Text',
                bindable: true
              },
              required: {
                label: { en: 'Required', fr: 'Requis' },
                type: 'OnOff',
                defaultValue: false,
                bindable: true
              },
              disabled: {
                label: { en: 'Disabled', fr: 'Désactivé' },
                type: 'OnOff',
                defaultValue: false,
                bindable: true
              },
              description: {
                label: { en: 'Description', fr: 'Description' },
                type: 'Text',
                bindable: true
              },
              rows: {
                label: { en: 'Rows (textarea)', fr: 'Lignes (textarea)' },
                type: 'Number',
                defaultValue: 3,
                bindable: true
              },
              options: {
                label: { en: 'Options (select)', fr: 'Options (select)' },
                type: 'Array',
                options: {
                  item: {
                    type: 'Object',
                    options: {
                      item: {
                        value: {
                          label: { en: 'Value', fr: 'Valeur' },
                          type: 'Text',
                          bindable: true
                        },
                        label: {
                          label: { en: 'Label', fr: 'Libellé' },
                          type: 'Text',
                          bindable: true
                        }
                      }
                    }
                  }
                },
                bindable: true
              },
              checkboxLabel: {
                label: { en: 'Checkbox label', fr: 'Libellé de la case' },
                type: 'Text',
                bindable: true
              }
            }
          }
        }
      },
      bindable: true
    },
    actions: {
      label: { en: 'Actions', fr: 'Actions' },
      type: 'Array',
      options: {
        item: {
          type: 'Object',
          options: {
            item: {
              id: {
                label: { en: 'Action ID', fr: 'ID de l\'action' },
                type: 'Text',
                bindable: true
              },
              label: {
                label: { en: 'Label', fr: 'Libellé' },
                type: 'Text',
                bindable: true
              },
              variant: {
                label: { en: 'Variant', fr: 'Variante' },
                type: 'TextSelect',
                options: {
                  options: [
                    { value: 'default', label: { en: 'Default', fr: 'Par défaut' } },
                    { value: 'destructive', label: { en: 'Destructive', fr: 'Destructeur' } },
                    { value: 'outline', label: { en: 'Outline', fr: 'Contour' } },
                    { value: 'secondary', label: { en: 'Secondary', fr: 'Secondaire' } },
                    { value: 'ghost', label: { en: 'Ghost', fr: 'Fantôme' } },
                    { value: 'link', label: { en: 'Link', fr: 'Lien' } }
                  ]
                },
                defaultValue: 'default',
                bindable: true
              },
              icon: {
                label: { en: 'Icon', fr: 'Icône' },
                type: 'Icon',
                bindable: true
              },
              disabled: {
                label: { en: 'Disabled', fr: 'Désactivé' },
                type: 'OnOff',
                defaultValue: false,
                bindable: true
              },
              closeSheet: {
                label: { en: 'Close sheet on click', fr: 'Fermer le panneau au clic' },
                type: 'OnOff',
                defaultValue: true,
                bindable: true
              },
              customClass: {
                label: { en: 'Custom CSS class', fr: 'Classe CSS personnalisée' },
                type: 'Text',
                bindable: true
              }
            }
          }
        }
      },
      defaultValue: [
        {
          id: 'cancel',
          label: 'Cancel',
          variant: 'outline',
          closeSheet: true
        },
        {
          id: 'save',
          label: 'Save',
          variant: 'default',
          closeSheet: true
        }
      ],
      bindable: true
    },
    contentClass: {
      label: { en: 'Content CSS class', fr: 'Classe CSS du contenu' },
      type: 'Text',
      bindable: true
    },
    footerClass: {
      label: { en: 'Footer CSS class', fr: 'Classe CSS du pied de page' },
      type: 'Text',
      bindable: true
    },
    customClass: {
      label: { en: 'Custom CSS class', fr: 'Classe CSS personnalisée' },
      type: 'Text',
      bindable: true
    },
    customStyle: {
      label: { en: 'Custom style', fr: 'Style personnalisé' },
      type: 'Text',
      bindable: true
    }
  }
} 