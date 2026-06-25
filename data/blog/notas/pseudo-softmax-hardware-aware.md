---
title: 'Pseudo-Softmax hardware-aware: una nota de investigacion'
date: '2026-06-25'
tags: ['hardware-aware-ai', 'fpga', 'transformers', 'softmax']
draft: false
summary: 'Una nota breve para organizar la intuicion detras de aproximar Softmax cuando el objetivo no es solo entrenar un modelo, sino llevarlo a hardware eficiente.'
layout: PostLayout
bibliography: references-data.bib
---

Esta nota funciona como punto de partida para documentar una linea de trabajo: aproximar operaciones costosas en modelos tipo transformer cuando el destino final no es una demo, sino una implementacion eficiente y verificable.

Softmax es una pieza pequena en apariencia, pero aparece justo en lugares donde el costo numerico, la estabilidad y la latencia importan. La pregunta de investigacion no es solamente si una aproximacion funciona en Python, sino si conserva suficiente comportamiento util cuando se traduce a una ruta de hardware.

## Preguntas abiertas

- Que forma de aproximacion mantiene mejor la relacion entre precision y costo?
- Como se mide el error cuando el bloque vive dentro de un modelo mayor?
- Que restricciones aparecen al pensar en RTL, memoria y paralelismo?

Esta entrada puede crecer hacia un paper, una nota tecnica reproducible o una serie conectada con el proyecto de aceleracion hardware para Softmax.
